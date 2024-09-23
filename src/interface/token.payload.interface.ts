export interface TokenPayload {
    id: number;
    role: 'ADMIN' | 'CLIENT';
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload; // Adicione a propriedade user
        }
    }
}