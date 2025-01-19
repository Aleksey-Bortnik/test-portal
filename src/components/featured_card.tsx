import React from "react";
import "./featured_card.scss";
import { Video } from "src/types/video.type";

interface FeaturedCardProps {
  video: Video;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ video }) => {
  return (
    <div className="featured-card">
      <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
      <div className="featured-card__content">
        <h2>{video.snippet.title}</h2>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};
