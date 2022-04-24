import { Vector2 } from '../../../shared/domain';

export type PlanetMap = Array<Array<boolean>>;

export class Planet {
    #id: string;

    #origin: Vector2 = Vector2.zero();

    #buildCoords: Vector2;

    #map: PlanetMap;

    /**
     * Planet Class
     * @param coords Upper right coordinates to create Planet
     */
    constructor(coords: Vector2) {
        this.#id = '';
        this.#buildCoords = coords;
        this.#map = this.buildMap();
    }

    /**
     * Builds the map grid
     * @returns PlanetMap
     */
    private buildMap(): PlanetMap {
        const xMax = this.#buildCoords.x + 1;
        const yMax = this.#buildCoords.y + 1;
        let y = 0;
        const map: PlanetMap = [];
        while (y < yMax) {
            let x = 0;
            const arr: Array<boolean> = [];
            while (x < xMax) {
                arr.push(false);
                x += 1;
            }
            map.push(arr);
            y += 1;
        }
        return map;
    }

    /**
     * Planet ID
     * @returns String ID
     */
    get id(): string {
        return this.#id;
    }

    /**
     * Planet ID
     * @returns String ID
     */
     set id(uId: string) {
        this.#id = uId;
    }

    /**
     * Origin lower left coordinates
     * @returns Vector2 (0, 0)
     */
    get origin(): Vector2 {
        return this.#origin;
    }

    /**
     * Upper right coordinates
     * @returns Vector2
     */
    get buildCoords(): Vector2 {
        return this.#buildCoords;
    }

    /**
     * Map grid
     * @returns PlanetMap
     */
    get map(): PlanetMap {
        return this.#map;
    }

    /**
     * Checks whether the input coordinates are inside the Map grid or not
     * @param x X coordinate to check
     * @param y Y coordinate to check
     * @returns Boolean True if coordinates are inside the Map grid
     */
    public isInsideEdges(x: number, y: number): boolean {
        return y < this.#map.length && x < this.#map[y].length;
    }

    /**
     * Checks whether there is a robot scent in the given coordinates
     * @param x X coordinate to check
     * @param y Y coordinate to check
     * @returns Boolean True if there is an scent in the given coordinates
     */
    public isRobotScent(x: number, y: number): boolean {
        if (this.isInsideEdges(x, y)) return this.#map[y][x];

        throw new Error('Coordinates outside boundries');
    }

    /**
     * Insert a robot scent in the given coordinates
     * @param x X coordinate for the scent
     * @param y Y coordinate for the scent
     * @returns
     */
    public insertRobotScent(x: number, y: number): void {
        if (this.isInsideEdges(x, y)) {
            this.#map[y][x] = true;
            return;
        }
        throw new Error('Coordinates outside boundries');
    }
}