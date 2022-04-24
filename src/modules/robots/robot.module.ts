import { Route } from '../../shared/domain';
import { RobotController } from './controllers/robot.controller';
import { RobotRepository } from './repositories/robot.repository';
import { GetRobotsByRoute } from './routes/get-robots-by-route';
import { PostRobotsRoute } from './routes/post-robots-route';
import { RobotService } from './services/robot.service';

export class RobotModule {
    #controller: RobotController;
    #service: RobotService;
    #repository: RobotRepository;
    #routes: Route[];
    constructor() {
        this.#repository = new RobotRepository();
        this.#service = new RobotService();
        this.#controller = new RobotController(this.#service);
        this.#routes = [
            new PostRobotsRoute(this.#controller),
            new GetRobotsByRoute(this.#controller),
        ];
    }

    get routes(): Route[] {
        return this.#routes;
    }

    get repository(): RobotRepository {
        return this.#repository;
    }

    get controller(): RobotController {
        return this.#controller;
    }

    get service(): RobotService {
        return this.#service;
    }
}
