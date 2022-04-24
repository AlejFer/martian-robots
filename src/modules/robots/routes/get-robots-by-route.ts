import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { RobotController } from '../controllers/robot.controller';

export class GetRobotsByRoute extends Route {
    #robotController: RobotController;

    constructor(robotController: RobotController) {
        super('robots');
        this.#robotController = robotController;
    }

    build(): void {
        this.router.get('/:marsid', validateInput({
            type: 'object',
            properties: {
                marsid: { type: 'string' },
            },
            required: ['marsid'],
        }, {
            caseInsensitive: true,
            requestProperty: 'params',
        }), this.#robotController.getResolvedPlanet());
    }
}
