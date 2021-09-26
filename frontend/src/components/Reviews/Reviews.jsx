import React, { createElement, useState } from 'react';
import './reviews.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePostFetch } from '../../redux/actions/reviewsAC';

const Reviews = ({ review }) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const deletePost = () => {
    dispatch(deletePostFetch(review._id));
  };

  const handleRelocate = (id) => {
    history.push(`/api/review/${id}`);
  };
  const changeTime = (time) => {
    const newTime = time.match(/\d{4}-\d{2}-\d{2}/g);
    return newTime[0];
  };
  const reviewLogo = (direction) => {
    switch (direction) {
      case 'Frontend':
        return 'img/frontStack.png';
      case 'Backend':
        return 'img/backStack.png';
      case 'FullStack':
        return 'img/fullStack.png';
      default:
        break;
    }
  };

  return (
    <div className="container container-main">
      <div className="wrap">
        <>
          <div
            onClick={() => {
              handleRelocate(review._id);
            }}
            className="block-img"
            style={{
              background: `url(${reviewLogo(
                review.direction
              )}) no-repeat center`,
              height: '190px',
              'background-size': 'cover',
            }}
          >
            <span className="rating">
              {review?.rating} <i className="fa fa-star"></i>{' '}
            </span>
            <div className="date">{changeTime(review?.created)}</div>
            <span className="salary">{review?.salary}</span>
          </div>
          <div className="block-title">
            <div className="wrap-rating">
              <span className="user-working-pasition">
                {review?.direction} Developer
              </span>

              {review?.author?._id == user._id &&
              user.isAuth &&
              history.location.pathname === `/user/${user._id}` ? (
                <div className="icons">
                  <Link to={`/review/edit/${review._id}`}>
                    <i className="fa fa-edit"></i>
                  </Link>

                  <Link
                    onClick={() => {
                      deletePost();
                    }}
                    className="trashBtn"
                  >
                    <i className="fa fa-trash"></i>
                  </Link>
                </div>
              ) : (
                <span></span>
              )}
            </div>
            <p className="company-location">
              {review.companyName}
              <br />
            </p>
            <div className="wrapper-user-position">
              <Link to={`/user/${review?.author?._id}`}>
                <span className="user-name">{review?.author?.name}</span>
              </Link>

              <Link to={`/review/${review._id}`} title="Подробнее">
                ...
              </Link>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Reviews;
