import { Application, Router } from 'express';

export default abstract class SelectorDeControlador {
    protected router: Router;

    protected constructor(app: Application, basePath: string) {
        this.router = Router();
        this.initializeRouter();
        app.use(basePath, this.router);
    }

    protected abstract initializeRouter(): void;
}