import { Planet } from '../../planets/domain/planet';
import { Robot } from '../domain/robot';

/**
 * Command Interface to define the Commands behaviour
 */
export interface Command {
    run(robot: Robot, planet?: Planet): void;
}