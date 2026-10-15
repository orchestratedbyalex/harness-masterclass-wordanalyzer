import { IAction } from '../../../models';
import { ApplicationState, initialState as initialApplicationState } from '../../../models/states/IApplicationState';
import { SET_APP_LOADER } from '../../actions/application';

const applicationState = (state: ApplicationState = initialApplicationState, action: IAction) => {

    switch (action.type) {

        case SET_APP_LOADER:
            return state.set("loader", action.payload);

        default:
            return state;
    }

};

export default applicationState;