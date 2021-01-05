import AuthRouter from './auth/AuthRouter';
import CharacterRouter from './character/CharacterRouter';
import DefaultRouter from './default/DefaultRouter';
import UserRouter from './user/UserRouter';

export default [
    DefaultRouter,
    AuthRouter,
    CharacterRouter,
    UserRouter
]