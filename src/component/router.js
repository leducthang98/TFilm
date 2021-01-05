import AuthRouter from './auth/AuthRouter';
import CharacterRouter from './character/CharacterRouter';
import DefaultRouter from './default/DefaultRouter';
import DirectorRouter from './director/DirectorRouter';
import MovieRouter from './movie/MovieRouter';
import UserRouter from './user/UserRouter';

export default [
    DefaultRouter,
    AuthRouter,
    CharacterRouter,
    UserRouter,
    DirectorRouter,
    MovieRouter
]