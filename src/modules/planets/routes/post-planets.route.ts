import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { PlanetController } from '../controllers/planet.controller';

export class PostPlanetsRoute extends Route {
    #planetController: PlanetController;

    /**
     * Create the route create-mars
     */
    constructor(planetController: PlanetController) {
        super('planets');
        this.#planetController = planetController;
    }

    build(): void {
        this.router.post('/', validateInput({
            type: 'object',
            properties: {
                coordinates: { type: 'string' },
            },
            required: ['coordinates'],
        }, {
            caseInsensitive: true,
            requestProperty: 'body',
        }), this.#planetController.createMars());
    }
}
