import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function Navigation(props) {

  function handleClickLoading() {
    props.handleLoading();
  }

  function handleLogoClick() {
    props.onLogoClick();
  }

  return (
    <nav className="menu">
      <div className="menu__container">
      <h1 className="menu__heading" onClick={handleLogoClick}>Natalya Stafeeva</h1>
      <ul className="menu__ul">
        <li>
          <Link to="#" className="menu__li" onClick={handleClickLoading}>Загрузить</Link>
        </li>
        <li>
          <Link to="#" className="menu__li">Удалить</Link>
        </li>
        <li>
          <Link to="#" className="menu__li">Статистика</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}


export default Navigation;
