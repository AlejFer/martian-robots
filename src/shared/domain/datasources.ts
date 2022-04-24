import { PlanetRepository } from '../../modules/planets/repositories/planet.repository';
import { RobotRepository } from '../../modules/robots/repositories/robot.repository';

export type Datasources = {
    planets: PlanetRepository;
    robots: RobotRepository;
}