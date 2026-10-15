import { createStore, applyMiddleware } from 'redux';
import sagaMiddlewareFactory from 'redux-saga';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import startUp from './actions/startup';


const configureStore = (): any => {

    const sagaMiddleWare = sagaMiddlewareFactory();
    const middleWare = applyMiddleware(
        sagaMiddleWare
    );

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWare)
    );

    sagaMiddleWare.run(startUp);

    return store;

};

export default configureStore;