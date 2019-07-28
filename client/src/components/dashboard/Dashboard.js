import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = props => {
    useEffect(() => {
        props.getCurrentProfile();
    }, []);

    return props.profile.loading && props.profile.profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user' />
                {/* If user exists, show its name  */}
                Welcome {props.auth.user && props.auth.user.name}
            </p>
            {props.profile.profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={props.profile.profile.experience} />
                    <Education education={props.profile.profile.education} />

                    <div className='my-2'>
                        <button
                            className='btn btn-danger'
                            onClick={() => props.deleteAccount()}
                        >
                            <i className='fas fa-user-minus' /> Delete My
                            Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to='create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentProfile: () => dispatch(actions.getCurrentProfile()),
        deleteAccount: () => dispatch(actions.deleteAccount())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
