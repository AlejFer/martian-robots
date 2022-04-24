import { Datasources, ID, Vector2 } from '../../../shared/domain';
import { Planet } from '../domain/planet';

export class PlanetService {
    /**
     * Create Planet Mars
     * @param vector 
     * @param datasources 
     * @returns Planet
     */
    createMars(vector: Vector2, datasources: Datasources): Planet {
        const planet = new Planet(vector);
        datasources.planets.set(planet);
        return planet;
    }

    /**
     * Return all existing planets
     * @param datasources 
     * @returns Array of planet IDs
     */
    getPlanets(datasources: Datasources): ID[] {
        return datasources.planets.getAll();
    }
}
