import { Link } from 'react-router-dom';
import style from './contact.module.css'

function Contact() {
  return (
    <div className='container container-main'>
      <div className={style.sectionTitle}>
        <h5>МЫ ХОТЕЛИ БЫ УСЛЫШАТЬ ОТ ВАС</h5>
        <h1>У вас есть вопрос или вы хотите узнать больше о <span className={style.logo}>Interv<span className={style.red}>/eW</span></span> ?</h1>
        <span>По всем вопросам поддержки и техническим вопросам обращайтесь по электронной почте:
          <a href='mailto:support@interview.com'>support@interview.com</a>
        </span>
      </div>
    </div>
  )
}

export default Contact
