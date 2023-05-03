import './singleComicPage.css';
import useMarvelService from '../services/MarvelService';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const SingleComicPage = () => {
   const { getComic, loading, error, clearError } = useMarvelService()
   const [comic, setComic] = useState(null)

   const { id } = useParams()

   const onComic = (res) => {
      setComic(res)
   }

   useEffect(() => {
      clearError()
      getComic(id).then(onComic)
   }, [id])

   const errorMessage = error ? <ErrorMessage /> : null
   const spinner = loading ? <Spinner /> : null
   const content = !(loading || error || !comic) ? <View comic={comic} /> : null
   return (
      <>
         {errorMessage}
         {spinner}
         {content}
      </>
   )
}

const View = ({ comic }) => {
   const { name, price, thumbnail, pages, text, language } = comic
   return (
      <div className="single-comic" >
         <img src={thumbnail} alt={name} className="single-comic__img" />
         <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{text}</p>
            <p className="single-comic__descr">{pages} pages</p>
            <p className="single-comic__descr">{language ? `Language: ${language}` : null}</p>
            <div className="single-comic__price">{price}</div>
         </div>
         <Link to=".." relative='path' className="single-comic__back">Back to all</Link>
      </div>
   )
}

export default SingleComicPage;