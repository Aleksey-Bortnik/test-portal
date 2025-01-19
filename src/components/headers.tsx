import React from "react";
import "./header.scss";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className="header">
      <div className="header__left">
        <img src="/assets/images/logo.png" alt="play-icon" />
      </div>

      <div className="header__center">
        <input
          type="text"
          placeholder="Что бы ты хотел посмотреть?"
          className="header__search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="header__search-btn">Искать</button>
        <button className="header__filter-btn">
        <img src="/assets/images/settings.png" alt="settings-icon" />
        </button>
      </div>

      <div className="header__right">
        <span className="header__user-name">Имя пользователя</span>
        <button className="header__profile-btn">
        <img src="/assets/images/user.png" alt="user-icon" />
        </button>
      </div>
    </div>
  );
};
