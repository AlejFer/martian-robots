import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../../../domain/middleware';
import { Handler, Datasources } from '../../../domain';
import { PlanetRepository } from '../../../../modules/planets/repositories/planet.repository';
import { RobotRepository } from '../../../../modules/robots/repositories/robot.repository';

export class RepositoryMiddleware extends Middleware {
    _planetRepo: PlanetRepository;

    _robotRepo: RobotRepository;

    constructor(planetRepo: PlanetRepository, robotRepo: RobotRepository) {
        super();
        this._planetRepo = planetRepo;
        this._robotRepo = robotRepo;
    }

    run(): Handler {
        return (_req: Request, res: Response, next: NextFunction) => {
            const datasources: Datasources = {
                planets: this._planetRepo,
                robots: this._robotRepo,
            };
            res.locals.datasources = datasources;
            next();
        }
    }
}