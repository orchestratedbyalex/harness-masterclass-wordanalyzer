import React from 'react';
// External libs
import { Button, TextField } from '@material-ui/core';

// styles
import '../Results.css';
import { ISubmitWordForm } from '../../../../../interfaces/ISubmitWordForm';


// component that renders frequency calculator widget
const SubmitWordForm: React.FunctionComponent<ISubmitWordForm> = (props: ISubmitWordForm) => {

    // local state to manage frecuency word 
    return (
        <div className="frequencyWordInputWrapper">
            <TextField id="frecuencyWordTextField" variant="outlined"
                className="frequencyWordInput"
                label="Word to find"
                value={props.wordToCalculateFrequency}
                autoComplete="off"
                inputProps={{ 'aria-describedby': 'frequency-description' }}
                onKeyDown={props.onKeyDown}
                onChange={props.onChange} />
            <Button
                variant="contained"
                color="primary"
                disabled={props.wordToCalculateFrequency.length === 0}
                onClick={props.onSubmit}>
                OK
            </Button>
        </div>
    );
};


export default (SubmitWordForm);
