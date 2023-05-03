import img from './error.gif'
import style from './ErrorMessage.module.css'

const ErrorMessage = () => {
   return (
      <img className={style.img} src={img} alt="Error" />
   )
}

export default ErrorMessage