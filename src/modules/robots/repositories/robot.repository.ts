import { BaseRepository, ID, Repository } from '../../../shared/domain';
import { Robot } from '../domain/robot';

export class RobotRepository extends BaseRepository implements Repository<Array<Robot>> {
    private _robots: Record<string, Array<Robot>>;

    constructor() {
        super();
        this._robots = {};
    }

    get(id: ID): Array<Robot> {
        return this._robots[id];
    }

    set(value: Array<Robot>, id?: ID): ID {
        if (id) {
            this._robots[id] = value;
        }
        return id || '';
    }
}