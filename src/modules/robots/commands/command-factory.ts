import { InternalServer } from '../../../shared/domain';
import { Command } from './command';
import { CommandForward } from './command-forward';
import { CommandLeft } from './command-left';
import { CommandRight } from './command-right';

export type Input = 'L' | 'R' | 'F';

/**
 * CommandFactory class. Factory to handle the creation of new commands.
 */
export class CommandFactory {
    /**
     * Create command according to the Input
     * @param input Input from instructions [L | R | F]
     * @returns Command
     */
    static createCommand(input: Input): Command {
        switch(input) {
            case "F": return new CommandForward();
            case "L": return new CommandLeft();
            case "R": return new CommandRight();
            default: throw new InternalServer('Invalid Command. Command Not Found');
        }
    }
}