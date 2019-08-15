import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import PostItem from '../PostItem';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { loading, post }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, []);
    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to='/posts' className='btn'>
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className='comments'>
                {post.comments.map(comment => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                    />
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        post: state.post
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPost: id => dispatch(actions.getPost(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
