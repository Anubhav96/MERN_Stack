import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = props => {
    useEffect(() => {
        props.getPosts();
    }, []);

    return props.post.loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primar'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome to the community
            </p>
            <PostForm />
            {props.post.posts.map(post => {
                return <PostItem key={post._id} post={post} />;
            })}
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        post: state.post
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => {
            dispatch(actions.getPosts());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);
