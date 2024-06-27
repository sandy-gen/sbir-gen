// src/middleware/sanitizeMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

export function sanitizeMiddleware(req: Request, res: Response, next: NextFunction): void {
    const decodedURI = decodeURI(req.url);
    req.url = sanitizeHtml(decodedURI);

    for (let p in req.query) {
        if (Array.isArray(req.query[p])) {
            const sanitizedQ = [];
            for (const q of req.query[p] as string[]) {
                sanitizedQ.push(sanitizeHtml(q));
            }
            req.query[p] = sanitizedQ;
        } else {
            req.query[p] = sanitizeHtml(req.query[p] as string);
        }
    }
    next();
}