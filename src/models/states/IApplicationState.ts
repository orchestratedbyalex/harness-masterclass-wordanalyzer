import { Record } from 'immutable';
import { IError } from '../IError';


const defaultParams = {
    error: {
        title: '',
        message: ''
    },
    loader: {
        isLoading: false,
        message: ''
    }
};
export interface IApplicationState {
    error: IError;
    loader: IApplicationLoadingState;
}
export interface IApplicationLoadingState {
    isLoading: boolean;
    message?: string;
}

export class ApplicationState extends Record(defaultParams) implements IApplicationState { };

export const initialState = new ApplicationState();
