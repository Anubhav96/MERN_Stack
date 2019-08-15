import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import * as actions from '../../store/actions/index';

const Profiles = props => {
    useEffect(() => {
        props.getProfiles();
    }, []);
    return (
        <Fragment>
            {props.profile.loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop' />
                        Browse and connect with developers
                    </p>
                    <div className='profiles'>
                        {Profiles.length > 0 ? (
                            props.profile.profiles.map(profile => {
                                return (
                                    <ProfileItem
                                        key={profile._id}
                                        profile={profile}
                                    />
                                );
                            })
                        ) : (
                            <h4>No profile found</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getProfiles: () => dispatch(actions.getAllProfiles())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profiles);
