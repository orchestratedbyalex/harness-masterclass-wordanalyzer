import { IApplicationLoadingState } from '../models/states/IApplicationState';
import { IDispatcher } from './IDispatcher';
import { FormView } from '../enums/FormView';

export interface IForm extends IDispatcher {
    loader: IApplicationLoadingState;
    view: FormView;
}
