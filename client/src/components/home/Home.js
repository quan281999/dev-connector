import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

const Home = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <h1 className="medium text-primary">
        <i className="fa fa-globe" /> Become a part of the developer community
      </h1>
      <PostForm />
      <div className="posts">
        {posts.map((post) => {
          return <PostItem key={post._id} post={post} />
        })}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Home);
