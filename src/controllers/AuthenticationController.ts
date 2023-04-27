import SelectorDeControlador from "./SelectorDeControlador";
import HttpStatusCodes from 'http-status-codes';
import { Request, Response,Application } from "express";
import Guardia from "../models/entities/Guardia";
import Sesion from "../models/Sesion";


interface RegistroBody{
    nombre:string,
    password:string,
    turno: string
}
interface InicioSesionBody{
    nombre:string,
    password:string
}


export default class AuthenticationController extends SelectorDeControlador{
    protected initializeRouter(): void {
        this.router.post('/registro', this.registroGuardia);
        this.router.post('/iniciarSesion', this.inicioSesion);
    }


    private async registroGuardia(req:Request, res:Response):Promise<void>{
        try{
            const {
                nombre,
                password,
                turno}=<RegistroBody>req.body;
                if (!nombre || !password || !turno){
                    res.status(HttpStatusCodes.BAD_REQUEST).end();
                    return;
                }
                const nuevoGuardia = await Guardia.registrar(nombre,password,turno);
                const sesion =Sesion.crearParaGuardia(nuevoGuardia);
                res.status(HttpStatusCodes.OK).json(sesion);

        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorGuardiaDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un guardia registrado con el mismo nombre.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }

    }
    private async inicioSesion(req:Request,res:Response):Promise<void>{
        
        try{
            const {
                nombre,
                password
            }=<InicioSesionBody>req.body;
            if(!nombre || !password){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const guardia = await Guardia.buscarPorNombreUsuarioYPassword(nombre,password);
            const sesion =Sesion.crearParaGuardia(guardia);
            res.status(HttpStatusCodes.OK).json(sesion);
        }catch(e){
            if (e instanceof Error && e.message === 'ErrorGuardiaNoEncontrado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'El guardia no ha sido registrado' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();

        }
        

    }
    public static mount(app: Application): AuthenticationController {
        return new AuthenticationController(app, '/auth');
    }




}