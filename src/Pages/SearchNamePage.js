import ComicsHeader from '../components/comicsHeader/ComicsHeader'
// import style from './SearchNamePage.module.css'

// const { wrapper, img, descr, name } = style
import './singleComicPage.css'

const SearchNamePage = ({ searchPage }) => {
   return (
      <>
         <ComicsHeader />
         <View comic={searchPage} />
      </>
   )
}

const View = ({ comic }) => {
   console.log(comic)
   const { name, thumbnail, description } = comic[0]
   return (
      <div className="single-comic" >
         <img src={thumbnail} alt={name} className="search__img" />
         <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
         </div>
      </div>
   )
}

export default SearchNamePage