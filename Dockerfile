# Build image locally
# docker build --no-cache -t sbir-gen-app .

# Run image from command line requires lots of env vars, so use docker-compose
# docker compose up -d --build --remove-orphans

FROM node:20-alpine
# pdfjs-dist depends on node-canvas (must be built on alpine) and node-gyp
RUN apk add --update --no-cache \
    libc6-compat python3 make g++ \
    cairo-dev pango-dev jpeg-dev giflib-dev

# Install Chromium for Puppeteer
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY . .
# Make sure the env.SECRETKEY_PATH var matches this location so it can be found
RUN mv packages/server/encryption.key .

# skip husky install (pre-commit hooks not needed in image)
RUN npm pkg set scripts.postinstall="echo no-postinstall"
RUN yarn install --network-concurrency 10
RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]
