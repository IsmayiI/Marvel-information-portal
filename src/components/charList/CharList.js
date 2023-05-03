import './charList.css';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types'

const CharList = (props) => {

   const [list, setList] = useState([])
   const [loading, setLoading] = useState(true)
   const [offset, setOffset] = useState(210)
   const [newItemLoading, setNewItemLoading] = useState(true)
   const [listEnd, setListEnd] = useState(false)
   const [focus, setFocus] = useState(false)

   const { error, getAllCharacters } = useMarvelService()

   useEffect(() => {
      let mounted = true;

      (async () => {
         const data = await getAllCharacters()
         if (!mounted) return;

         onListLoaded(data)
         setLoading(false)
      })()

      return () => {
         mounted = false
      }
   }, [])



   const onListLoaded = (newList) => {
      let ended = false
      if (newList.length < 9) {
         ended = true
      }

      setList(list => [...list, ...newList])
      setOffset(offset => offset + 9)
      setNewItemLoading(false)
      setListEnd(ended)
   }

   const onFocus = (id) => {
      setFocus(id)
   }


   const updateList = (offset) => {
      setNewItemLoading(true)
      getAllCharacters(offset).then(onListLoaded)
   }

   const click = (id) => {
      props.onCharSelected(id)
      onFocus(id)
   }

   const view = () => {
      if (error) {
         return <ErrorMessage />
      }
      return loading
         ? <Spinner />
         : <ul className="char__grid">{listItems}</ul>
   }

   const listItems = list.map(({ name, thumbnail, id }) => {

      let clazz = {}
      if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
         clazz = { objectFit: 'unset' }
      }

      return (
         <li onClick={() => click(id)} key={id} className={`char__item ${focus === id ? 'char__item_selected' : ''}`}>
            <img style={clazz} src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
         </li>
      )
   })


   return (
      <div className="char__list">
         {view()}
         <button
            onClick={() => updateList(offset)}
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{ 'display': listEnd ? 'none' : 'block' }} >
            <div className="inner">load more</div>
         </button>
      </div>
   )
}

CharList.propTypes = {
   onCharSelected: PropTypes.func
}

export default CharList;