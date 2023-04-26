import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '/database/DatabaseConnection';

@Entity({ name: 'guardias' })
export default class Usuario {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    public nombre: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    public turno: string;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    private constructor(
        id: number | undefined,
        nombreUsuario: string,
        password: string,
        nombreCompleto: string,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.nombreCompleto = nombreCompleto;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public static async registrar(
        nombreUsuario: string,
        password: string,
        nombreCompleto: string
    ): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const fechaCreacion = new Date();

        const usuario = new Usuario(
            undefined,
            nombreUsuario,
            password,
            nombreCompleto,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(usuario);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorNombreUsuarioDuplicado');
            }

            throw e;
        }

        return usuario;
    }

    public static async buscarPorNombreUsuarioYPassword(
        nombreUsuario: string,
        password: string
    ): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const usuario = await repositorioUsuarios.findOneBy({ nombreUsuario, password });

        if (!usuario) {
            throw new Error('ErrorUsuarioNoEncontrado');
        }

        return usuario;
    }

    public static async buscarPorId(id: number): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const usuario = await repositorioUsuarios.findOneBy({ id });

        if (!usuario) {
            throw new Error('ErrorUsuarioNoEncontrado');
        }

        return usuario;
    }

    private static async obtenerRepositorioUsuarios(): Promise<Repository<Usuario>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Usuario);
    }
}
