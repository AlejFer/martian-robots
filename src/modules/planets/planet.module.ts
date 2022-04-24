import { Route } from '../../shared/domain';
import { PlanetController } from './controllers/planet.controller';
import { PlanetRepository } from './repositories/planet.repository';
import { GetPlanetsRoute } from './routes/get-planets.route';
import { PostPlanetsRoute } from './routes/post-planets.route';
import { PlanetService } from './services/planet.service';

export class PlanetModule {
    #controller: PlanetController;
    #service: PlanetService;
    #repository: PlanetRepository;
    #routes: Route[];
    constructor() {
        this.#repository = new PlanetRepository();
        this.#service = new PlanetService();
        this.#controller = new PlanetController(this.#service);
        this.#routes = [
            new PostPlanetsRoute(this.controller),
            new GetPlanetsRoute(this.controller),
        ];
    }

    get routes(): Route[] {
        return this.#routes;
    }

    get repository(): PlanetRepository {
        return this.#repository;
    }

    get controller(): PlanetController {
        return this.#controller;
    }

    get service(): PlanetService {
        return this.#service;
    }
}
