import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const CommentForm = props => {
    const [text, setText] = useState('');
    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Leave a comment</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    props.addComment(props.postId, { text });
                    setText('');
                }}
            >
                <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Add a comment'
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <input
                    type='submit'
                    className='btn btn-dark my-1'
                    value='Submit'
                />
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        addComment: (id, formData) => dispatch(actions.addComment(id, formData))
    };
};

export default connect(null, mapDispatchToProps)(CommentForm);
