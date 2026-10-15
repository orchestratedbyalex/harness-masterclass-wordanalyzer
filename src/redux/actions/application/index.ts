import { IAction } from "../../../models/IAction";
import { IError } from "../../../models/IError";
import { IApplicationLoadingState } from "../../../models/states/IApplicationState";


export const SET_APP_LOADER = "SET_APPLICATION_LOADER";
export const SET_APP_ERROR = "SET_APP_ERROR";


export function startLoader(message?: string): IAction {

    const payload: IApplicationLoadingState = {
        isLoading: true,
        message
    };

    return {
        type: SET_APP_LOADER,
        payload
    };

}

export function stopLoader(): IAction {

    const payload: IApplicationLoadingState = {
        isLoading: false,
        message: undefined
    };

    return {
        type: SET_APP_LOADER,
        payload
    };
}

export function setError(payload: IError): IAction {

    return {
        type: SET_APP_ERROR,
        payload
    };

}

export function clearError(): IAction {

    return {
        type: SET_APP_ERROR,
        payload: null
    };

}

