import { NextFunction, Request, Response } from 'express';
import { Datasources, Handler, ID, Vector2 } from '../../../shared/domain';
import { Helper } from '../../../shared/infra/utils/helper';
import { ResolvedPlanet } from '../domain/resolvedPlanet';
import { Orientation, Robot } from '../domain/robot';
import { RobotService } from '../services/robot.service';

export class RobotController {
    #robotService: RobotService;

    constructor(robotService: RobotService) {
        this.#robotService = robotService;
    }

    /**
     * Send robots to planet and resolve each robot instructions
     * @returns 
     */
    sendRobots(): Handler {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { robotsets, marsid }: { robotsets: Array<string>; marsid: ID } = req.body;
            try {
                const datasources: Datasources = Helper.getDatasources(res);
                this.#robotService.hasRobots(marsid, datasources);
                const robots: Array<Robot> = [];
                let i = 0;
                while(i < robotsets.length) {
                    try {
                        const [x, y, o] = robotsets[i].split(' ');
                        const instructions = robotsets[i + 1];
                        Helper.isInstructionsValid(instructions);
                        const orientation: Orientation = o as Orientation;
                        Helper.isOrientationValid(orientation);
                        const vector = new Vector2(Number(x), Number(y))
                        Helper.isVectorValid(vector);
                        robots.push(this.#robotService.createRobot(vector, orientation, instructions));
                    } catch (error: any) {
                        return next(error);
                    }
                    i += 2;
                }
                const resolution: ResolvedPlanet = this.#robotService.sendRobots(robots, marsid, datasources);
                const map = Helper.drawMap(resolution.planet, resolution.robots);
                res.send(`Planet Mars ${marsid} <br> <br> ${map} <br> <br> ${Helper.getRobotsResult(robots)}`).status(200);
            } catch (error) {
                next(error);
            }
        };
    }

    /**
     * Get robot execution from a given planet
     * @returns 
     */
     getResolvedPlanet(): Handler {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { marsid } = req.params;
            try {
                const datasources: Datasources = Helper.getDatasources(res);
                const resolution: ResolvedPlanet = this.#robotService.getResolvedPlanet(marsid, datasources);
                const map = Helper.drawMap(resolution.planet, resolution.robots);
                res.send(`Planet Mars ${marsid} <br> <br> ${map} <br> <br> ${Helper.getRobotsResult(resolution.robots)}`).status(200);
            } catch (error) {
                next(error);
            }
        };
    }
}
