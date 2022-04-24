export class Vector2 {
    private _x: number;

    private _y: number;

    /**
     * Returns zero vector2
     * @returns Vector2
     */
    static zero(): Vector2 {
        return new Vector2(0, 0);
    }

    /**
     * Addition between two vectors2 and returns a new resultant vector2
     * @param a 
     * @param b 
     * @returns Vector2
     */
    static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y
    }

    set y(value: number) {
        this._y = value;
    }
}