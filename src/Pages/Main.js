import CharInfo from "../components/charInfo/CharInfo"
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import ErrorBoundry from '../components/errorBoundry/ErrorBoundry'
import decoration from '../resources/img/vision.png';
import { useState } from "react";
import Search from "../components/search/Search";



const Main = ({ onSearchPage }) => {
   const [charSelected, setCharSelected] = useState(null)

   const onCharSelected = (charId) => {
      setCharSelected(charId)
   }

   return (
      <>
         <ErrorBoundry>
            <RandomChar />
         </ErrorBoundry>
         <div className="char__content">
            <ErrorBoundry>
               <CharList onCharSelected={onCharSelected} />
            </ErrorBoundry>
            <div>
               <ErrorBoundry>
                  <CharInfo charId={charSelected} />
               </ErrorBoundry>
               <ErrorBoundry>
                  <Search onSearchPage={onSearchPage} />
               </ErrorBoundry>
            </div>

         </div>
         <img className="bg-decoration" src={decoration} alt="vision" />
      </>
   )
}

export default Main