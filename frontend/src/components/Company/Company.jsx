import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allFetch } from '../../redux/actions/companyAC';
import style from './company.module.css';
import { useLoaderContext } from '../../context/LoaderContext';
import Loader from '../Loader/Loader';

export default function Company() {
  const dispatch = useDispatch();
  const history = useHistory();
  const companies = useSelector((state) => state.companys);

  const { loader, showLoader, hideLoader } = useLoaderContext();

  useEffect(() => {
    showLoader();
    dispatch(allFetch()).then(() => hideLoader());
  }, []);

  const handleRelocate = (id) => {
    history.push(`/company/${id}`);
  };

  return (
    <div className="container container-main">
      {loader ? (
        <Loader />
      ) : (
        <div className={style.company}>
          {companies.length ? (
            companies?.map((el) => (
              <div
                onClick={() => handleRelocate(el._id)}
                className={style.wrap}
                key={el._id}
              >
                <div className={style.wrapper}>
                  <span className={style.rating}>
                    {el.rating} <i className="fa fa-star"></i>
                  </span>
                </div>
                <p className={style.location}>
                  <div
                    style={{
                      background: `url(${el.logo['240']}) no-repeat center`,
                      height: '180px',
                    }}
                  ></div>
                  {el.companyName}, {el.area}
                </p>
                <Link className={style.link} to={`company/${el._id}`}>
                  Подробнее
                </Link>
              </div>
            ))
          ) : (
            <h1 className={style.info}>NO companies</h1>
          )}
        </div>
      )}
    </div>
  );
}
