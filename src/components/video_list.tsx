import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/app/store";
import { response } from "src/api/response";
import { Video } from "src/types/video.type";
import { fetchVideos } from "src/app/slice/video.slice";
import { Card } from "src/components/card";
import "./video_list.scss";

const defaultPerPage = 12;
const perPageOptions = [12, 20, 32, 56];

interface VideoListProps {
  searchQuery: string;
}

export function VideoList({ searchQuery }: VideoListProps) {
  const videos = useSelector((state: RootState) => state.videoReducer.videos);
  const dispatch = useDispatch();

  const [sortType, setSortType] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(defaultPerPage);

  const getSortedVideos = (videos: Video[]) => {
    switch (sortType) {
      case "newest":
        return [...videos].sort(
          (a, b) =>
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
        );
      case "oldest":
        return [...videos].sort(
          (a, b) =>
            new Date(a.snippet.publishedAt).getTime() -
            new Date(b.snippet.publishedAt).getTime()
        );
      case "title":
        return [...videos].sort((a, b) =>
          a.snippet.title.localeCompare(b.snippet.title)
        );
      default:
        return videos;
    }
  };

  const getFilteredVideos = (videos: Video[], query: string) => {
    if (!query) return videos;
    return videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getPaginatedVideos = (videos: Video[], page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return videos.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/items');
        const data = await response.json();
        dispatch(fetchVideos(data));
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const sortedVideos = getSortedVideos(videos);
  const filteredVideos = getFilteredVideos(sortedVideos, searchQuery);
  const paginatedVideos = getPaginatedVideos(filteredVideos, currentPage, perPage);

  const totalPages = Math.ceil(filteredVideos.length / perPage);
 
  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="video-list-container">
      <div className="sort-controls">
        <label htmlFor="sort-select">Сортировать по:</label>
        <select
          id="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="newest">Новые → Старые</option>
          <option value="oldest">Старые → Новые</option>
          <option value="title">По заголовку</option>
        </select>
      </div>

      <div className="video-list">
        {paginatedVideos.map((video) => (
          <Card key={video.id} video={video} />
        ))}
      </div>

      <div className="pagination">
        <div className="pagination__pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination__button ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <select
          className="pagination__per-page"
          value={perPage}
          onChange={(e) => handlePerPageChange(Number(e.target.value))}
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
