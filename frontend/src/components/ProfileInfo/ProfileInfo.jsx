import Modal from '../../components/Modal/Modal';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLoaderContext } from '../../context/LoaderContext';
import { clear, getAllFetch } from '../../redux/actions/reviewsAC';
import { changeAvatarFetch } from '../../redux/actions/userAC';
import Loader from '../Loader/Loader';
import Reviews from '../Reviews/Reviews';
import Sort from '../Sort/Sort';
import './ProfileInfo.css';
import ProgressBar from '../Progress/Progress';

function ProfileInfo() {
  const reviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.user);

  const idUserForUpdate = user._id;
  const [currentUserReview, setCurrentUserReview] = useState(reviews);
  const [infoFromUser, setInfoFromUser] = useState({});

  const inputFile = useRef(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { loader, showLoader, hideLoader } = useLoaderContext();
  const [modalActive, setModalActive] = useState(false);
  function modalOpen(idUserForUpdate) {
    setModalActive(true);
  }

  useEffect(() => {
    (async () => {
      const newUser = await fetch(`/api/user/${id}/getInfo`, {
        credentials: 'include',
      });
      showLoader();
      const myUser = await newUser.json();
      dispatch(getAllFetch()).then(() => hideLoader());
      setInfoFromUser(myUser);
    })();
    return () => {
      dispatch(clear());
    };
  }, [id, modalActive, user]);

  useEffect(() => {
    const filteredReviews = reviews?.filter((review) => {
      return review?.author?._id == id;
    });
    setCurrentUserReview(filteredReviews);
  }, [reviews]);

  const avatarChange = (e) => {
    dispatch(changeAvatarFetch(e.target.files[0], user?._id));
  };
  return (
    <div className="container container-main">
      <div className="main">
        <div className="profile">
          <div className="user">
            <div
              className="userPhoto"
              style={{
                background: `url('${infoFromUser.avatar}') 100%/100% no-repeat `,
              }}
            ></div>
            {user._id == id && (
              <>
                <ProgressBar currentUserReview={currentUserReview} />
                <span
                  className="addImg"
                  onClick={() => {
                    inputFile.current.click();
                  }}
                >
                  <i className="fa fa-plus"></i>
                </span>
              </>
            )}

            <input
              name="image"
              className="input"
              type="file"
              ref={inputFile}
              onChange={(e) => {
                avatarChange(e);
              }}
            />
          </div>

          <div className="userInfo">
            <span className="name">
              {infoFromUser.name} {infoFromUser.surname}
            </span>
            {infoFromUser.showContact === true ? (
              <span className="fontFamily">
                <i className="fab fa-telegram"></i> {infoFromUser.telegram}
              </span>
            ) : (
              <span className="fontFamily">
                <i className="fab fa-telegram"></i> Пользователь скрыл контакты
              </span>
            )}

            {user?._id == id && (
              <button
                className="btn"
                onClick={() => modalOpen(idUserForUpdate)}
              >
                Редактировать профиль
              </button>
            )}
            {modalActive && (
              <Modal
                active={modalActive}
                setActive={setModalActive}
                idUser={idUserForUpdate}
              />
            )}
          </div>
        </div>
        <div className="reviews">
          <div className="sortWrap">
            <Sort />
          </div>
          <p className="myReviews">Мои последние отзывы :</p>
          {loader ? (
            <Loader />
          ) : (
            <div className="wrapper">
              {currentUserReview.length ? (
                currentUserReview?.map((review) => {
                  return (
                    <div key={review._id}>
                      <Reviews review={review} />
                    </div>
                  );
                })
              ) : (
                <span className="reviewsNone">У вас пока нет отзывов</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
