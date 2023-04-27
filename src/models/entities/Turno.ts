import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'turnos' })
export default class Turno {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    public nombre: string;

    @Column({ type: 'datetime', nullable: false })
    public horaEntrada: Date;

    @Column({ type: 'datetime', nullable: false })
    public horaSalida: Date;

   
    private constructor(
        id: number | undefined,
        nombre: string,
        turno: string,
       horaEntrada:Date,
       horaSalida:Date
    ) {
        this.id = <number>id;
        this.nombre = nombre;
        this.horaEntrada = horaEntrada;
        this.horaSalida = horaSalida;
    }
}
