import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import uploadLogo from '../../images/light/upload_icon_149852.svg';
import deletedLogo from '../../images/light/deleteCircle.png';
import statisticLogo from '../../images/light/bar_chart_bar_graph_statistics_diagram_icon_187100.svg';

function Navigation(props) {

  function handleClickLoading() {
    props.handleLoading();
  }

  function handleLogoClick() {
    props.onLogoClick();
  }

  const iconClass = props.iconIsActive ? 'menu__icon_active' : '';

  return (
    <nav className="menu">
      <div className="menu__container">
      <h1 className="menu__heading" onClick={handleLogoClick}>Natalya Stafeeva</h1>
      <div className="menu__heading_ts" onClick={handleLogoClick}><p>NS</p></div>
      <ul className="menu__ul">
        <li>
          <img className={`menu__icon ${iconClass}`} src={uploadLogo} alt="download-icon" onClick={handleClickLoading}></img>
          <Link to="#" className="menu__li" onClick={handleClickLoading}>Загрузить</Link>
        </li>
        <li>
          <img className="menu__icon" src={deletedLogo} alt="delete-icon"></img>
          <Link to="#" className="menu__li">Удалить</Link>
        </li>
        <li>
          <img className="menu__icon" src={statisticLogo} alt="stat-icon"></img>
          <Link to="#" className="menu__li">Статистика</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}


export default Navigation;
