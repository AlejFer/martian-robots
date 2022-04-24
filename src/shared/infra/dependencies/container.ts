import { PlanetModule } from '../../../modules/planets/planet.module';
import { RobotModule } from '../../../modules/robots/robot.module';
import { RepositoryMiddleware } from '../http/middlewares/repository-middleware';
import { RouterBuilder } from '../http/routes/router-builder';

export class Container {
    /** Application Modules */
    static planetModule: PlanetModule = new PlanetModule();
    static robotModule: RobotModule = new RobotModule();

    /** Build Application Routes */
    static routerBuilder: RouterBuilder = new RouterBuilder(
        [...Container.planetModule.routes, ...Container.robotModule.routes]
    );

    /** Build Middlewares */
    static repositoryMiddleware: RepositoryMiddleware = new RepositoryMiddleware(
        Container.planetModule.repository,
        Container.robotModule.repository,
    );
}
