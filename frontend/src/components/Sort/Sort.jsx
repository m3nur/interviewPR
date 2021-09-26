import React, { useState } from 'react';
import './Sort.css';
import { useDispatch, useSelector } from 'react-redux';
import { sortReviews } from '../../redux/actions/reviewsAC';
import { Link } from 'react-router-dom';

const Sort = () => {

  const user = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch();
  const [isSorted, setisSorted] = useState(false);

  const handleSort = (e, isSorted) => {
    dispatch(sortReviews({ e, isSorted }));
    setisSorted(!isSorted);
  };

  return (
    <div className="sort d-flex justify-content-between">
      <button
        className="sort-item"
        data-name="created"
        onClick={(e) => handleSort(e, isSorted)}
      >
        Дата создания
      </button>
      <button
        className="sort-item"
        data-name="salary"
        onClick={(e) => handleSort(e, isSorted)}
      >
        Зарплата
      </button>
      <button
        className="sort-item"
        data-name="rating"
        onClick={(e) => handleSort(e, isSorted)}
      >
        Рейтинг
      </button>
      {
        user ?
          <Link className="add-item" to="/review/addReview">
            {' '}
            Добавить отзыв
          </Link>
          :
          ''
      }
    </div>
  );
};

export default Sort;
