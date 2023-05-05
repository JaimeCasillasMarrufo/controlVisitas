import axios, {AxiosError} from 'axios';
import Visita from '../models/entities/Visita';

export default class VisitaService{


    private readonly baseUrl: string;

    public constructor(){
         this.baseUrl = 'http://172.18.70.105:3001/visita';

    }
    public async obtenerVisita(idVisita: number): Promise<Visita> {
        const respuesta = await axios.get(`${this.baseUrl}/visitas/${idVisita}`);
        
        return respuesta.data as Visita;
    }
}