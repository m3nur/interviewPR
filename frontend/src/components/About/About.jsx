import './about.css'

function About() {
  return (
    <div className='container container-main'>
      <div className="about">
        <h1 className='meet'>Познакомьтесь с нашей командой</h1>
        <div className='ourTeam'>
          <div className='teem'>
            <div>
              <h2>Slava Svirov</h2>
              <span>FullStack Developer <a target='_blank' href="https://github.com/SlavaSvirov"> <i className='fab fa-github'></i></a></span>
            </div>
          </div>

          <div className='teem'>
            <div>
              <h2>Hanna Testi</h2>
              <span>FullStack Developer <a target='_blank' href="https://github.com/estihann"> <i className='fab fa-github'></i></a></span>
            </div>
          </div>

          <div className='teem'>
            <div>
              <h2>Roman Novikov</h2>
              <span>FullStack Developer <a target='_blank' href="https://github.com/Mirrors2015"> <i className='fab fa-github'></i></a></span>
            </div>
          </div>

          <div className='teem'>
            <div>
              <h2>Nurbek Murataliev</h2>
              <span>FullStack Developer <a target='_blank' href="https://github.com/NurMura88"> <i className='fab fa-github'></i></a></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About


