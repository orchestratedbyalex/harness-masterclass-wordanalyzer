import React from 'react';
// External libs
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

// local componets
import AppLoader from '../Loader';
import HeroTitle from '../HeroTitle';

// interfaces
import { IForm } from '../../interfaces/IForm';

// factories
import { FormViewFactory } from '../../factories/FormViewFactory';

// Styles
import './Form.css';

const Form: React.FunctionComponent<IForm> = (props: IForm) => {
    return (
        <main className='formWrapper'>
            {props.loader.isLoading ?
                <AppLoader />
                :
                <>
                    <header className='appHeader'>
                        <HeroTitle />
                        <Typography variant="body2" component="p" className="appByline">
                            Showcase by Alexander Gomez
                        </Typography>
                    </header>
                    <div className='appContent'>
                        {FormViewFactory.create(props.view)}
                    </div>
                </>
            }
        </main>
    );
};

const mapStateToProps = (state: any) => ({ loader: state.application.loader, view: state.form.view });

export default connect(mapStateToProps)(Form);
