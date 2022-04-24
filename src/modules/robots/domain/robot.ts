import { Vector2 } from '../../../shared/domain';
import { Command } from '../commands/command';

export type Orientation = 'N' | 'S' | 'E' | 'W';

export class Robot {
    private _coords: Vector2;

    private _orientation: Orientation;

    private _isLost: boolean;

    private _instructions: Array<Command>;

    /**
     * Robot Class
     * @param coords Coordinates of first position
     * @param orientation Robot first orientation
     * @param instructions Robot commands
     */
    constructor(coords: Vector2, orientation: Orientation, instructions: Array<Command>) {
        this._coords = coords;
        this._orientation = orientation;
        this._isLost = false;
        this._instructions = instructions
    }

    /**
     * Robot current position
     * @returns Vector2
     */
    get coords(): Vector2 {
        return this._coords;
    }

    /**
     * Set robot current position
     * @returns Vector2
     */
    set coords(value: Vector2) {
        this._coords = value;
    }

    /**
     * Robot current orientation
     * @returns Orientation
     */
    get orientation(): Orientation {
        return this._orientation;
    }

    /**
     * Set robot current orientation
     * @returns Orientation
     */
    set orientation(value: Orientation) {
        this._orientation = value;
    }

    /**
     * Robot current lost state
     * @returns Boolean
     */
    get isLost(): boolean {
        return this._isLost;
    }

    /**
     * Set robot current lost state
     * @returns Boolean
     */
    set isLost(value: boolean) {
        this._isLost = value;
    }

    /**
     * Robot commands
     * @returns Array<Command>
     */
    get instructions(): Array<Command> {
        return this._instructions;
    }
}