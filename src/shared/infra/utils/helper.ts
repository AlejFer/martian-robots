import { Response } from 'express';
import { Vector2 } from '../../domain/vector2';
import { Datasources, BadRequest } from '../../domain';
import { Planet } from '../../../modules/planets/domain/planet';
import { Orientation, Robot } from '../../../modules/robots/domain/robot';

export class Helper {
    /**
     * Draws a planet map
     * @param planet 
     * @param robots 
     * @returns string map
     */
    static drawMap(planet: Planet, robots: Array<Robot> = []): string {
        const empty = '[ ] ';
        const getRobot = (orientation: Orientation): string => {
            switch(orientation) {
                case 'N': return '[^] ';
                case 'S': return '[v] ';
                case 'W': return '[<] ';
                case 'E': return '[>] ';
                default: throw new Error(`Robot Orientation ${orientation} is not recognized`);
            }
        };
        const scent = '[·] ';
        const lbr = '<br> ';
        let draw = '';
        const vector: Vector2 = Vector2.zero();
        let yIndex = planet.buildCoords.y;
        while (yIndex >= 0) {
            let xIndex = 0;
            while (xIndex < planet.map[yIndex].length) {
                vector.x = xIndex;
                vector.y = yIndex;
                let itemToDraw: string = empty;
                if (planet.isRobotScent(xIndex, yIndex)) {
                    itemToDraw = scent;
                } else {
                    robots.forEach(robot => {
                        if (!robot.isLost && robot.coords.x === xIndex && robot.coords.y === yIndex) {
                            itemToDraw = getRobot(robot.orientation);
                        }
                    });
                }
                draw = draw.concat(itemToDraw);
                xIndex += 1;
            }
            draw = draw.concat(lbr);
            yIndex -= 1;
        }
        return draw;
    };

    /**
     * Get the datasources from the request context
     * @param res 
     * @returns Datasources
     */
    static getDatasources(res: Response): Datasources {
        return res.locals.datasources;
    }

    /**
     * Validates vector cap of 50
     * @param vector 
     * @returns boolean
     */
    static isVectorValid(vector: Vector2): boolean {
        if (vector.x > 50) throw new BadRequest('X coordinate cannot be greater than 50');
        if (vector.y > 50) throw new BadRequest('Y coordinate cannot be greater than 50');
        return true;
    }

    /**
     * Validates instructions cap of 100
     * @param instructions 
     * @returns boolean
     */
    static isInstructionsValid(instructions: string): boolean {
        if (instructions.length > 100) throw new BadRequest('Instructions CAP (100) exceed');
        return true;
    }

    /**
     * Validates orientation [N, E, S, W]
     * @param o 
     * @returns boolean
     */
    static isOrientationValid(o: Orientation): boolean {
        if (o !== 'N' && o !== 'E' && o !== 'S' && o !== 'W') throw new BadRequest(`Orientation ${o} is not allowed`);
        return true;
    }

    /**
     * Builds the response according to the robots final state
     * @param robots Robots from mars
     * @returns String result
     */
    static getRobotsResult(robots: Robot[]): string {
        let result: string = '';
        robots.forEach(robot => {
            const re = `${robot.coords.x} ${robot.coords.y} ${robot.orientation} ${robot.isLost ? 'LOST' : ''} <br>`;
            result = result.concat(re);
        });
        return result;
    }
}