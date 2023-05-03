import style from './ComicsList.module.css'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const { img, block, wrapper, listItem, button } = style

const ComicsList = () => {
   const [list, setList] = useState([])
   const [loading, setLoading] = useState(true)
   const [offset, setOffset] = useState(1)
   const { error, getAllComics } = useMarvelService()

   useEffect(() => {
      let mounted = true;

      (async () => {
         const data = await getAllComics()
         if (!mounted) return;

         onCharLoaded(data)
         setLoading(false)
      })()

      return () => {
         mounted = false
      }
   }, [])


   const onCharLoaded = (char) => {
      const newChar = char
      setOffset(offset => offset + 8)
      setList(char => [...char, ...newChar])
   }

   const updateList = (offset) => {
      getAllComics(offset).then(onCharLoaded)
   }

   const listItems = list.map(({ name, price, thumbnail, id }, i) => {
      return (
         <Link to={`${id}`} key={i} className={listItem}>
            <img className={img} src={thumbnail} alt={name} />
            <h2 className={style.name}>{name}</h2>
            <h3 className={style.price}>{price}</h3>
         </Link>
      )
   })

   const view = () => {
      if (error) {
         return <ErrorMessage />
      }

      return loading ? <Spinner /> : listItems
   }

   return (
      <div className={block}>
         <ul className={wrapper}>
            {view()}
         </ul>
         <button
            onClick={() => updateList(offset)}
            className={`button button__main button__long ${button}`} >
            <div className="inner">load more</div>
         </button>
      </div >
   )
}

export default ComicsList