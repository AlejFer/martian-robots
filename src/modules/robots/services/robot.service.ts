import { Planet } from '../../../modules/planets/domain/planet';
import { Datasources, ID, Vector2 } from '../../../shared/domain';
import { Command } from '../commands/command';
import { CommandFactory, Input } from '../commands/command-factory';
import { ResolvedPlanet } from '../domain/resolvedPlanet';
import { Orientation, Robot } from '../domain/robot';

export class RobotService {
    /**
     * Send robots to planet and resolve each robot execution
     * @param robots 
     * @param planetId 
     * @param datasources 
     * @returns ResolvedPlanet
     */
    sendRobots(robots: Robot[], planetId: ID, datasources: Datasources): ResolvedPlanet {
        const planet: Planet = datasources.planets.get(planetId) as Planet;
        if (!planet) {
            throw new Error('Planet Mars does not exist');
        }
        this.resolveRobots(robots, planet);
        datasources.robots.set(robots, planetId);
        return new ResolvedPlanet(robots, planet);
    }

    /**
     * Checks if planet already has robots
     * @param id 
     * @param datasources 
     */
    hasRobots(id: ID, datasources: Datasources) {
        if (datasources.robots.get(id)) {
            throw new Error('Planet Mars already has robots');
        }
    }

    /**
     * Creates a robot
     * @param position 
     * @param orientation 
     * @param instructions 
     * @returns Robot
     */
    createRobot(position: Vector2, orientation: Orientation, instructions: string): Robot {
        return new Robot(position, orientation, this.buildCommands(instructions));
    }

    /**
     * Get Resolved Planet
     * @param planetId 
     * @param datasources 
     * @returns ResolvedPlanet
     */
    getResolvedPlanet(planetId: ID, datasources: Datasources): ResolvedPlanet {
        const planet = datasources.planets.get(planetId);
        if (!planet) {
            throw new Error('Planet does not exist');
        }
        const robots = datasources.robots.get(planetId) || [];
        return new ResolvedPlanet(robots, planet);
    }

    /**
     * Creates the commands according to the given instructions
     * @param instructions Instructions to translate into commands
     * @returns Array<Command> Commands array
     */
    private buildCommands(instructions: string): Array<Command> {
        const commands: Array<Command> = [];
        let i = 0;
        while(i < instructions.length) {
            commands.push(CommandFactory.createCommand(instructions.charAt(i) as Input));
            i += 1;
        }
        return commands;
    }

    /**
     * Executes each robots commands
     * @param robots Robots to simulate
     * @param planet Planet Mars
     */
    private resolveRobots(robots: Array<Robot>, planet: Planet): void {
        robots.forEach(robot => {
            const commands = robot.instructions;
            let i = 0;
            while(!robot.isLost && i < commands.length) {
                commands[i].run(robot, planet);
                i += 1;
            }
        });
    }
}
