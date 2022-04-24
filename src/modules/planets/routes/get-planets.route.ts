import { Route } from '../../../shared/domain';
import { PlanetController } from '../controllers/planet.controller';

export class GetPlanetsRoute extends Route {
    #planetController: PlanetController;

    /**
     * Create the route create-mars
     */
    constructor(planetController: PlanetController) {
        super('planets');
        this.#planetController = planetController;
    }

    build(): void {
        this.router.get('/', this.#planetController.getPlanets());
    }
}
