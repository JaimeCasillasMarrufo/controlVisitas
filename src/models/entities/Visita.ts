import DatabaseConnection from "../../database/DatabaseConnection";

export default class Visita {
    public id: number;

    public nombre: string;
    public direccion: string;
    public estatus : number;
    public fechaCreacion: Date;
    public fechaActualizacion:Date;

    
    public constructor(
        id: number | undefined,
        nombre:string,
        direccion: string,
        estatus : number,
        fechaCreacion: Date,
        fechaActualizacion:Date,


    ) {
        this.id = id as number;
        this.nombre = nombre;
        this.direccion = direccion;
        this.estatus = estatus;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }



}
