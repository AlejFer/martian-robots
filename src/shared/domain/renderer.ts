import { Planet } from '../../modules/planets/domain/planet';
import { Robot } from '../../modules/robots/domain/robot';

export type Renderer = (planet: Planet, robots?: Array<Robot>) => string;