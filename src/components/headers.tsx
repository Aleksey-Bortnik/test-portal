import React, { useState } from "react";
import "./header.scss";
import videoApi from "src/api/videos.api";
import { Video } from "src/types/video.type";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { fetchVideos } from "src/app/slice/video.slice";

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterChange: (sortType: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onFilterChange }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    link: "",
  });
  const dispatch = useDispatch()

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSumbit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const existingVideo = await videoApi.list()
    const overwritedVideo: Video = {
      ...existingVideo[0],
      id: v4(),
      snippet: {
        ...existingVideo[0].snippet,
        title: formData.title,
        description: formData.description,
        thumbnails: {
          ...existingVideo[0].snippet.thumbnails,
          high: {
            ...existingVideo[0].snippet.thumbnails.high,
            url: formData.imgUrl
          }
        }
      },
    }
    await videoApi.post(overwritedVideo)
    dispatch(fetchVideos(await videoApi.list()))
    setModalOpen(false)
  }

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
        <button
          className="header__search-btn"
          onClick={() => onSearch(searchText)}
        >
          Искать
        </button>

        <div className="header__filter-container">
          <button
            className="header__filter-btn"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <img src="/assets/images/search_settings.svg" alt="settings-icon" />
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
        <button className="header__add-btn" onClick={() => setModalOpen(true)}>
          Добавить видео
        </button>
        <span className="header__user-name">Имя пользователя</span>
        <button className="header__profile-btn">
          <img src="/assets/images/user.png" alt="user-icon" />
        </button>
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Create new card</h2>
            <form className="modal__form" onSubmit={handleOnSumbit}>
              <label>Title</label>
              <input 
                type="text" 
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <label>Description</label>
              <input 
                type="text" 
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <label>Image</label>
              <input 
                type="text" 
                placeholder="Image URL"
                name="imgUrl"
                value={formData.imgUrl}
                onChange={handleChange}
              />
              <label>Video Link</label>
              <input 
                type="text" 
                placeholder="Video link"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
              <button type="submit" className="modal__submit-btn">
                Create card
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
