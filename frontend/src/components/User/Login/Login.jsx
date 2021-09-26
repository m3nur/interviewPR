import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { sagaLoginAC } from '../../../redux/actions/userAC';
import GoogleB from '../../GoogleB/GoogleB';
import style from './login.module.css';

function Login() {
  const formRef = useRef(null);

  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/' } };

  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (isAuth) {
      history.replace(from);
    }
  }, [isAuth]);

  const loginHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(
      new FormData(formRef.current).entries()
    );

    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(sagaLoginAC(valuesOfFields));
      formRef.current.reset();
    }
  };

  return (
    <section className={style.sectionLogin}>
      <form ref={formRef} onSubmit={loginHandler}>
        <div className={style.login}>
          <p className={style.logo}>
            Interv<span>/eW</span>.com
          </p>
          <p className={style.logoTagline}>Войдите и начните делиться</p>
          <div className={style.authWithGoogle}>
            <span className={style.socialNetwork}>
              С помощью социальных сетей
            </span>
            <span className={style.google}>
              <GoogleB />
            </span>
          </div>
          <span className={style.or}>или</span>
          <div className={style.loginInputs}>
            <label>Электронная почта</label>
            <br />
            <input type="text" name="email" />

            <br />
            <label>Пароль</label>
            <br />
            <input type="password" name="password" />

            <button className={style.button}>Войти</button>
          </div>
          <div>
            <p className={style.loginText}>
              У вас еще нет аккаунта?{' '}
              <Link to="/register">Зарегистрироваться</Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
