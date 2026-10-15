import React from 'react';
// External libs
import { Avatar, Typography } from '@material-ui/core';

// styles
import '../Results.css';
import { useStyles } from '../AvatarStyles';
import { IFrequencyCalculatorResults } from '../../../../../interfaces/IFrequencyCalculatorResults';


// component that renders frequency calculator widget results
const FrequencyCalculatorResults: React.FunctionComponent<IFrequencyCalculatorResults> = (props: IFrequencyCalculatorResults) => {

    const avatarClasses = useStyles();
    const frequencyWordImageExists: boolean = props.wordAsImageUrl.length > 0;

    // local state to manage frecuency word 
    return (
        <div className="calculatedFrequencyDetails" role="status" aria-live="polite">
            <div className="resultsTextWrapper">
                <Typography variant="overline">
                    found
                </Typography>
                <Avatar className="frequencyCount">{props.calculatedFrequency}</Avatar>
                <Typography variant="overline">
                    time(s)
                </Typography>
            </div>
            <div className="imageResultsContainer">
                {frequencyWordImageExists &&
                    <Typography variant="caption">Image result for {props.wordToCalculateFrequency}</Typography>}
                <Avatar variant="rounded" className={avatarClasses.large}
                    alt={props.wordToCalculateFrequency}
                    src={props.wordAsImageUrl}>{props.wordToCalculateFrequency.toUpperCase()}</Avatar>
            </div>
        </div>
    );
};


export default (FrequencyCalculatorResults);
