import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Main from '../../Pages/Main'
// import Comics from '../../Pages/Comics'
// import ErrorMessage from "../errorMessage/ErrorMessage";
// import SingleComicPage from "../../Pages/SingleComicPage";
import { lazy, Suspense, useState } from "react";
import Spinner from "../spinner/Spinner";
import SearchNamePage from "../../Pages/SearchNamePage";

const ErrorMessage = lazy(() => import('../errorMessage/ErrorMessage'))
const Main = lazy(() => import('../../Pages/Main'))
const Comics = lazy(() => import('../../Pages/Comics'))
const SingleComicPage = lazy(() => import("../../Pages/SingleComicPage"))


const App = () => {
   const [searchPage, setSearchPage] = useState(null)

   const onSearchPage = (char) => {
      setSearchPage(char)
   }


   return (
      <BrowserRouter>
         <div className="app">
            <AppHeader />
            <main>
               <Suspense fallback={<Spinner />}>
                  <Routes>
                     <Route path="comics" element={<Comics />} />
                     <Route path="comics/:id" element={<SingleComicPage />} />
                     <Route path="/" element={<Main onSearchPage={onSearchPage} />} />
                     <Route path="character/:name" element={<SearchNamePage searchPage={searchPage ? searchPage : null} />} />
                     <Route path="*" element={<ErrorMessage />} />
                  </Routes>
               </Suspense>
            </main>
         </div>
      </BrowserRouter>
   )
}

export default App;

