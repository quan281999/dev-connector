import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div style={{position:"relative"}}>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <i 
        className="fa fa-times" 
        style={{
          color: "var(--danger-color)", 
          cursor:"pointer", 
          position:"absolute", 
          top:"50%", 
          right:"0", 
          transform: "translateY(-50%)", 
          fontSize: "1.5rem"}} 
        onClick={() => deleteComment(postId, _id)}/>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
