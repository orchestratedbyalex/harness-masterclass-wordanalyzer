import { put } from 'redux-saga/effects';
import { startLoader, stopLoader, setError } from './application';
import initializeWatchers from './watchers';
import { toAppError } from '../../models/IError';


export default function* startUp(): any {

    try {
       
        //Start the spinner
        yield put(startLoader());
        
        //other start up actions

        yield put(stopLoader());

        //Initialize watchers after startup.
        yield initializeWatchers();
        
    }

    catch (err) {
        console.log(err);
        yield put(setError(toAppError(err)));
    }

    finally {
        //Always stop spinner
        yield put(stopLoader());
    }

}
