import { NextFunction, Request, Response } from 'express';
import { Datasources, Handler, ID, Vector2 } from '../../../shared/domain';
import { Helper } from '../../../shared/infra/utils/helper';
import { PlanetService } from '../services/planet.service';

export class PlanetController {
    #planetService: PlanetService;

    constructor(planetService: PlanetService) {
        this.#planetService = planetService;
    }

    /**
     * Create Planet Mars
     * @returns 
     */
    createMars(): Handler {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { coordinates } = req.body;
            const [x, y] = (coordinates as string).split(' ');
            try {
                const vector = new Vector2(Number(x), Number(y));
                Helper.isVectorValid(vector);
                const datasources: Datasources = Helper.getDatasources(res);
                const planet = await this.#planetService.createMars(vector, datasources);
                const map = Helper.drawMap(planet);
                res.send(`Planet Mars ${planet.id} <br> <br> ${map}`).status(200);
            } catch (error) {
                next(error);
            }
        };
    }

    /**
     * Get all existing planets
     * @returns 
     */
    getPlanets(): Handler {
        return async (_req: Request, res: Response, next: NextFunction) => {
            try {
                const datasources: Datasources = Helper.getDatasources(res);
                const planetsIds = await this.#planetService.getPlanets(datasources);
                let response = 'Existing planets <br> <br>';
                planetsIds.forEach((planetId: ID) => {
                    response += `-· ${planetId} <br>`;
                });
                res.send(response).status(200);
            } catch (error) {
                next(error);
            }
        };
    }
}
