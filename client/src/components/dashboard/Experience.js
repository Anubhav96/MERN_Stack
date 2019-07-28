import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Experience = props => {
    const experiences = props.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                    'Now'
                ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={() => props.deleteExperience(exp._id)}
                    className='btn btn-danger'
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className='my-2'>Experiences</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        deleteExperience: id => dispatch(actions.deleteExperience(id))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Experience);
