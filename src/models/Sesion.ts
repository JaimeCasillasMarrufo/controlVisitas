import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Guardia from './entities/Guardia';
import jwt from 'jsonwebtoken';

export default class Sesion {
    public tokenSesion: string;

    private static readonly secret = 'A ver si sale esto, no creo';

    private constructor(tokenSesion: string) {
        this.tokenSesion = tokenSesion;
    }

    public static crearParaGuardia(guardia: Guardia): Sesion {
        const data = {
            idGuardia: guardia.id,
            nombreGuardia: guardia.nombre,
            turnoGuardia: guardia.turno
        };

        const tokenSesion = jwt.sign(
            { data },
            Sesion.secret,
            { expiresIn: '1d' }
        );

        return new Sesion(tokenSesion);
    }

    public static verificarTokenSesion(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        try {
            const tokenSesion =
                <string>req.headers['Token-Sesion'.toLowerCase()];
            
            if (!tokenSesion) {
                res.status(HttpStatusCodes.UNAUTHORIZED).json({
                    mensaje: 'No se envio token de sesion.'
                });
                return;
            }

            jwt.verify(tokenSesion, Sesion.secret);

            next();
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.UNAUTHORIZED).json({
                mensaje: 'Token de sesion es invalido o ha expirado.'
            });
        }
    }
}
