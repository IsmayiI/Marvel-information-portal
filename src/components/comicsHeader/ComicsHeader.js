import style from './ComicsHeader.module.css'
import avangers from '../../resources/img/Avengers.png'
import avangersLogo from '../../resources/img/Avengers_logo.png'

const { img, div, text } = style

const ComicsHeader = () => {
   return (
      <div className={div}>
         <img src={avangers} alt="avangers" className={img} />
         <p className={text}>New comics every week! <br /> Stay tuned!</p>
         <img src={avangersLogo} alt="avangersLogo" className={img} />
      </div>
   )
}

export default ComicsHeader