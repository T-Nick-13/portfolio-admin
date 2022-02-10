import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function Navigation() {

  return (
    <nav className="menu">
      <div className="menu__container">
      <h1 className="menu__heading">Natalya Stafeeva</h1>
      <ul className="menu__ul">
        <li>
          <Link to="#" className="menu__li">Загрузить</Link>
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
