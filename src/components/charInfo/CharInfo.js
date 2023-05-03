import './charInfo.css';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

const CharInfo = (props) => {
   const [char, setChar] = useState(null)
   // const [trigger, setTrigger] = useState(false)

   const { process, setProcess, getCharacter, clearError } = useMarvelService()

   useEffect(() => {
      updateChar()
   }, [props.charId])

   const onCharLoaded = (char) => {
      setChar(char)
      setProcess('content')
   }

   const updateChar = () => {
      if (!props.charId) {
         return
      }
      clearError()
      getCharacter(props.charId).then(onCharLoaded)
      // setTrigger(true)
   }

   return (
      <>
         <div className="char__info">
            {setContent(process, View, char)}
         </div>
      </>
   )
}

const View = ({ data }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = data

   let clazz = {}
   if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      clazz = { objectFit: 'unset' }
   }

   return (
      <>
         <div className="char__basics">
            <img style={clazz} src={thumbnail} alt={name} />
            <div>
               <div className="char__info-name">{name}</div>
               <div className="char__btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="char__descr">
            {description}
         </div>
         <div className="char__comics">Comics:</div>
         <ul className="char__comics-list">
            {comics.length === 0
               ? <li style={{ textAlign: 'center' }}>Нет Данных</li>
               : comics.map(({ name }, i) => {
                  if ((i + 1) <= 10) {
                     return (
                        <li key={i} className="char__comics-item">
                           {name}
                        </li>
                     )
                  }
               })}
         </ul>
      </>
   )
}

CharInfo.propTypes = {
   charId: PropTypes.number
}

export default CharInfo;




//    const skeleton = char || loading || error ? null : <Skeleton />;
//    const errorMessage = error ? <ErrorMessage /> : null;
//    const spinner = loading ? <Spinner /> : null;
//    const content = !(loading || error || !char) ? <View char={char} /> : null;

//    return (
//       <div className="char__info">
//          {skeleton}
//          {errorMessage}
//          {spinner}
//          {content}
//       </div>
//    )
// }

