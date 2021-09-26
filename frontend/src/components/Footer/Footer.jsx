import './footer.css'
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer>
      <div className='container container-main'>
        <div className='copy'>

          <h3>Interv<span className='red'>/eW</span></h3>

          <div className='footerDiv'>
            <ul className='footerNav'>
              <li>
                <Link to="/about">О Нас</Link>
              </li>
              <li>
                <Link to="/contact">Контакты</Link>
              </li>
            </ul>
          </div>

          <hr />

          <div className='social-links'>
            <Link to='#'><i className='fab fa-facebook'></i></Link>
            <Link to='#'><i className='fab fa-twitter'></i></Link>
            <Link to='#'><i className='fab fa-instagram'></i></Link>
            <Link to='#'><i className='fab fa-pinterest'></i></Link>
            <Link to='#'><i className='fab fa-telegram'></i></Link>
          </div>

          <div className='copyright'>
            <p>Copyright © 2021 Interv/eW. All rights reserved. Reprinting prohibited.</p>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer

