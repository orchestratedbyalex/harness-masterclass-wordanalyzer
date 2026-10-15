import { combineReducers, Reducer } from 'redux';

import application from './application/application';
import form from './form/form';


export const rootReducer: Reducer = combineReducers({
    application,
    form
});
