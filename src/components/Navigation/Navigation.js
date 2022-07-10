import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import uploadLogo from '../../images/light/Загрузить.svg';
import deletedLogo from '../../images/light/Удалить.svg';
import statisticLogo from '../../images/light/Статистика.svg';

function Navigation(props) {

  function handleClickLoading() {
    props.handleLoading();
  }

  function handleLogoClick() {
    props.onLogoClick();
  }

  function handleClickDelete() {
    props.onDeleteClick();
  }

  function handleClickStat() {
    props.onStatClick();
  }

  const iconClass = props.iconIsActive ? 'menu__icon_active' : '';

  return (
    <nav className="menu">
      <div className="menu__container">
      {/* <h1 className="menu__heading" onClick={handleLogoClick}>Natalya Stafeeva</h1> */}
      <Link to="/" className="menu__heading" onClick={handleLogoClick}>Natalya Stafeeva</Link>
      <div className="menu__heading_ts" onClick={handleLogoClick}><p>NS</p></div>
      <ul className="menu__ul">
        <li onClick={handleClickLoading}>
          <img className={`menu__icon ${iconClass}`} src={uploadLogo} alt="download-icon"></img>
          <Link to="/upload" className="menu__li">Загрузить</Link>
        </li>
        <li onClick={handleClickDelete}>
          <img className="menu__icon" src={deletedLogo} alt="delete-icon" ></img>
          <Link to="/" className="menu__li">Удалить</Link>
        </li>
        <li onClick={handleClickStat}>
          <img className="menu__icon" src={statisticLogo} alt="stat-icon"></img>
          <Link to="/statistic" className="menu__li">Статистика</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}


export default Navigation;
