import { Orientation, Robot } from '../domain/robot';
import { Command } from './command';

/**
 * CommandRight handles the robot rotation changing its orientation by rotating to the right
 */
export class CommandRight implements Command {
    run(robot: Robot): void {
        const orientations: Array<Orientation> = ['N', 'E', 'S', 'W'];
        const index = orientations.indexOf(robot.orientation);
        if (index >= 0) {
            const i = index + 1;
            if (i > orientations.length - 1) {
                robot.orientation = orientations[0];
                return;
            }
            robot.orientation = orientations[i];
        }
    }
}