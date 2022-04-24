import { Planet } from '../domain/planet';
import { BaseRepository, Repository, ID } from '../../../shared/domain';

export class PlanetRepository extends BaseRepository implements Repository<Planet> {
    private _planets: Record<string, Planet>;

    constructor() {
        super();
        this._planets = {};
    }

    public getAll(): Array<ID> {
        return Object.keys(this._planets);
    };

    public get(id: ID): Planet {
        return this._planets[id];
    }

    public set(value: Planet): ID {
        const id = this.generateID();
        value.id = id;
        this._planets[id] = value;
        return id;
    }
}