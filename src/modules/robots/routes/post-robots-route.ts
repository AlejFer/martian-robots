import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { RobotController } from '../controllers/robot.controller';

export class PostRobotsRoute extends Route {
    #robotController: RobotController;

    constructor(robotController: RobotController) {
        super('robots');
        this.#robotController = robotController;
    }

    build(): void {
        this.router.post('/', validateInput({
            type: 'object',
            properties: {
                robotsets: { type: 'array' },
                marsid: { type: 'string' },
            },
            required: ['robotsets', 'marsid'],
        }, {
            caseInsensitive: true,
            requestProperty: 'body',
        }), this.#robotController.sendRobots());
    }
}
