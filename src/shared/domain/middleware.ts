import { Handler } from './handler';

export abstract class Middleware {
    abstract run(): Handler;
}