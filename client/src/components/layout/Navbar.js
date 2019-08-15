import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';

const Navbar = props => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' />{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={props.logout} to='/'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className='fas fa-code' /> DevConnector
                </Link>
            </h1>
            {!props.auth.loading ? (
                <Fragment>
                    {props.auth.isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            ) : null}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
