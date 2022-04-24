// import { Container } from '../dependencies/container';

import config from '../../../config/Config';

import express from 'express';
import { ErrorHandlerMiddleware } from './middlewares/error-handler-middleware';
import { Container } from '../dependencies/container';
import { RouterBuilder } from './routes/router-builder';
import { RepositoryMiddleware } from './middlewares/repository-middleware';

export class Server {
    private _server: express.Application;

    private _rBuilder: RouterBuilder;

    private _repoMiddleware: RepositoryMiddleware;

    constructor(){
        this._repoMiddleware = Container.repositoryMiddleware;

        this._server = express();

        this._server.use(express.json());
        this._server.use(express.urlencoded({ extended: true }));
        this._server.use(this._repoMiddleware.run());

        this._rBuilder = Container.routerBuilder;
    }

    start(){
        this._rBuilder.run(this._server);
        this._server.use(ErrorHandlerMiddleware);

        this._server.listen(config.get('server.port'), () => {
            console.log(`Listening at ${config.get('server.port')}`);
        });
    }
}