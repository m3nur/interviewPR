import styles from './MainPage.module.css';
import React, { useState, useEffect } from 'react';
import AutoComplete from '../CustomAutoComplete/CustomAutoComplete';
import Reviews from '../Reviews/Reviews';
import Sort from '../Sort/Sort';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllFetch } from '../../redux/actions/reviewsAC';
import { clear, getLitle } from '../../redux/actions/reviewsAC';
import { allFetch } from '../../redux/actions/companyAC';

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reviews);

  const [featching, setFeatching] = useState(false);
  const [index, setIndex] = useState(0);

  const scrollHandler = (e) => {
    const loc =
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight);
    // console.log({ loc });
    if (loc <= 100 && 98 <= loc) {
      setFeatching((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      dispatch(clear());
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(getLitle(index));
    setIndex((prev) => prev + 6);
  }, [featching]);

  return (
    <main className={styles.mainPageDiv}>
      <div className={styles.video}>
        <div className={styles.mainPageHexagon}>
          <video autoPlay muted playsInline loop className={styles.cat}>
            <source src="/imgLOGO/city.mp4" type="video/mp4" />
          </video>
          <div className="container container-main mainPageBgVideo">
            <div className={styles.mainPageText}>
              <h1>Будь готов к любому собеседованию!</h1>
              <p className={styles.mainPageTitle}>
                Сервис по обмену инсайдерской информацией
              </p>
            </div>

            <div className={styles.wrapperHexagons}>
              <div className={styles.hexagon}>
                <div className={styles.layer1}>
                  <div className={styles.layer2}>
                    <img
                      src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.hexagon}>
                <div className={styles.layer1}>
                  <div className={styles.layer2}>
                    <img src="/imgLOGO/1.jpg" alt="logo" />
                  </div>
                </div>
              </div>

              <div className={styles.hexagon}>
                <div className={styles.layer1}>
                  <div className={styles.layer2}>
                    <img
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fG9mZmljZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.hexagon}>
                <div className={styles.layer1}>
                  <div className={styles.layer2}>
                    <img
                      src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fG9mZmljZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container container-main">
        <div className={styles.secondMainPage}>
          <a name="secondPage"></a>
          <div className={styles.secondTitle}>
            <p className={styles.chck}>Начни с выбора компании!</p>
            <AutoComplete />
            <p className={styles.allReviewsText}>
              Или посмотри все отзывы, которые у нас есть
            </p>
          </div>
          <div className={styles.sortWrapper}>
            <Sort />
          </div>
          <div className={styles.wrapper}>
            {data?.map((review) => {
              return <Reviews key={review._id} review={review} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
