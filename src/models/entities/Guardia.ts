import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'guardias' })
export default class Guardia {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    public nombre: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    public turno: string;

    @Column({ type: 'varchar', nullable: false })
    public password: string;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    private constructor(
        id: number | undefined,
        nombre: string,
        password: string,
        turno: string,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.nombre = nombre;
        this.password= password;
        this.turno = turno;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public static async registrar(
        nombreGuardia: string,
        password:string,
        turno: string,
    ): Promise<Guardia> {
        const repositorioGuardias = await this.obtenerRepositorioGuardias();

        const fechaCreacion = new Date();

        const guardia = new Guardia(
            undefined,
            nombreGuardia,
            password,
            turno,
            fechaCreacion,
            fechaCreacion     
        );

        try {
            await repositorioGuardias.save(guardia);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorNombreGuardiaDuplicado');
            }

            throw e;
        }

        return guardia;
    }

    public static async buscarPorNombreUsuarioYPassword(
        nombre: string,
        turno: string
    ): Promise<Guardia> {
        const repositorioGuardias = await this.obtenerRepositorioGuardias();

        const guardia = await repositorioGuardias.findOneBy({ nombre, turno });

        if (!guardia) {
            throw new Error('ErrorGuardiaNoEncontrado');
        }

        return guardia;
    }

    public static async buscarPorId(id: number): Promise<Guardia> {
        const repositorioGuardia = await this.obtenerRepositorioGuardias();

        const guardia = await repositorioGuardia.findOneBy({ id });

        if (!guardia) {
            throw new Error('ErrorGuardiaNoEncontrado');
        }

        return guardia;
    }

    private static async obtenerRepositorioGuardias(): Promise<Repository<Guardia>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Guardia);
    }
}
