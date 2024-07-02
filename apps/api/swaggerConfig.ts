import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SBIR Generator API',
            version: '1.0.0',
            description: 'Proposal Generator API for SBIR proposal',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./apps/api/src/**/*.ts'], // Path to your API files
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
