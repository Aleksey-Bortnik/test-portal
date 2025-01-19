import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/app/store";
import { Video } from "src/types/video.type";
import { Card } from "src/components/card";
import { FeaturedCard } from "src/components/featured_card";
import { fetchVideos } from "src/app/slice/video.slice";
import "./video_list.scss";

interface VideoListProps {
  searchQuery: string;
  sortType: string;
}
export function VideoList({ searchQuery, sortType }: VideoListProps) {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.videoReducer.videos);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/items");
        const data = await response.json();
        dispatch(fetchVideos(data));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  const getFilteredVideos = (videos: Video[]) => {
    let filtered = videos;

    if (searchQuery) {
      filtered = filtered.filter((video) =>
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

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
  const getPaginatedVideos = (videos: Video[]) => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return videos.slice(startIndex, endIndex);
  };

  const filteredVideos = getFilteredVideos(videos);
  const sortedVideos = getSortedVideos(filteredVideos);
  const paginatedVideos = getPaginatedVideos(sortedVideos);
  const totalPages = Math.ceil(filteredVideos.length / perPage);

  return (
    <div className="video-list-container">
      {sortedVideos.length > 0 && <FeaturedCard video={sortedVideos[0]} />}
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
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          {[12, 20, 32, 56].map((option) => (
            <option key={option} value={option}>
              {option} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
