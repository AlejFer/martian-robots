import { Planet } from '../../planets/domain/planet';
import { Robot } from './robot';

export class ResolvedPlanet {
    #robots: Robot[];
    #planet: Planet;

    constructor(robots: Robot[], planet: Planet) {
        this.#robots = robots;
        this.#planet = planet;
    }

    /**
     * Robots from planet
     * @returns Robot[]
     */
    get robots(): Robot[] {
        return this.#robots;
    }

    /**
     * Planet
     * @returns Planet
     */
    get planet(): Planet {
        return this.#planet;
    }
}
