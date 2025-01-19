import React, { useState } from "react";
import "./header.scss";

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterChange: (sortType: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onFilterChange }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [searchText, setSearchText] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  const handleSortChange = (newSortType: string) => {
    setSortType(newSortType);
    onFilterChange(newSortType);
    setIsFilterVisible(false);
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src="/assets/images/logo.png" alt="play-icon" />
      </div>

      <div className="header__center">
        <input
          type="text"
          value={searchText}
          placeholder="Что бы ты хотел посмотреть?"
          className="header__search-input"
          onChange={handleSearchInput} 
        />
        <button className="header__search-btn" onClick={() => onSearch(searchText)}>
          Искать
        </button>

        <div className="header__filter-container">
          <button
            className="header__filter-btn"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <img src="/assets/images/settings.png" alt="settings-icon" />
          </button>
          {isFilterVisible && (
            <ul className="header__filter-dropdown">
              <li
                className={`header__filter-option ${
                  sortType === "newest" ? "active" : ""
                }`}
                onClick={() => handleSortChange("newest")}
              >
                Новые → Старые
              </li>
              <li
                className={`header__filter-option ${
                  sortType === "oldest" ? "active" : ""
                }`}
                onClick={() => handleSortChange("oldest")}
              >
                Старые → Новые
              </li>
              <li
                className={`header__filter-option ${
                  sortType === "title" ? "active" : ""
                }`}
                onClick={() => handleSortChange("title")}
              >
                По заголовку
              </li>
            </ul>
          )}
        </div>
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
