import { Planet } from '../../planets/domain/planet';
import { Vector2 } from '../../../shared/domain';
import { Robot } from '../domain/robot';
import { Command } from './command';

/**
 * CommandForward handles the robots movement in the direction it is facing according to its orientation
 */
export class CommandForward implements Command {
    run(robot: Robot, planet: Planet): void {
        const getMovement = (): Vector2 => {
            switch(robot.orientation) {
                case 'N': return new Vector2(0, 1);
                case 'S': return new Vector2(0, -1);
                case 'W': return new Vector2(-1, 0);
                case 'E': return new Vector2(1, 0);
                default: throw new Error(`Robot Orientation ${robot.orientation} is not recognized`);
            }
        };
        const currentPos: Vector2 = robot.coords;
        const aux = getMovement();
        const newPos: Vector2 = Vector2.add(currentPos, aux);
        if (planet.isInsideEdges(newPos.x, newPos.y)) {
            robot.coords = newPos;
            return;
        }
        if (planet.isRobotScent(currentPos.x, currentPos.y)) {
            return;
        }
        planet.insertRobotScent(currentPos.x, currentPos.y);
        robot.isLost = true;
    }
}