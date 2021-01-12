import AuthRouter from './auth/AuthRouter';
import CategoryRouter from './category/CategoryRouter';
import CharacterRouter from './character/CharacterRouter';
import DefaultRouter from './default/DefaultRouter';
import DirectorRouter from './director/DirectorRouter';
import MovieRouter from './movie/MovieRouter';
import SeasonRouter from './season/SeasonRouter';
import UserRouter from './user/UserRouter';

export default [
    DefaultRouter,
    AuthRouter,
    CharacterRouter,
    UserRouter,
    DirectorRouter,
    MovieRouter,
    SeasonRouter,
    CategoryRouter
]