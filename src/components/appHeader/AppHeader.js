import { NavLink, Link } from 'react-router-dom';
import './appHeader.css';

const AppHeader = () => {
   return (
      <header className="app__header">
         <h1 className="app__title">
            <Link to="/">
               <span>Marvel</span> information portal2
            </Link>
         </h1>
         <nav className="app__menu">
            <ul>
               <li><NavLink to="/">Characters</NavLink ></li>
               /
               <li><NavLink to="/comics">Comics</NavLink ></li>
            </ul>
         </nav>
      </header>
   )
}

export default AppHeader;