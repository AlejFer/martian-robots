import { Orientation, Robot } from '../domain/robot';
import { Command } from './command';

/**
 * CommandLeft handles the robot rotation changing its orientation by rotating to the left
 */
export class CommandLeft implements Command {
    run(robot: Robot): void {
        const orientations: Array<Orientation> = ['N', 'E', 'S', 'W'];
        const index = orientations.indexOf(robot.orientation);
        if (index >= 0) {
            const i = index - 1;
            if (i < 0) {
                robot.orientation = orientations[orientations.length - 1];
                return;
            }
            robot.orientation = orientations[i];
        }
    }
}