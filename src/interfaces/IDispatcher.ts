import { IAction } from "../models";

export interface IDispatcher {
    dispatch?: (action: IAction) => any;
}
