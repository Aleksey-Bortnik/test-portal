import React from "react";
import "./card.scss";

interface CardProps {
  video: {
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: { high: { url: string } };
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
    };
  };
}

export const Card: React.FC<CardProps> = ({ video }) => {
  return (
    <div className="card">
      <img
        className="card__thumbnail"
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
      />
      <div className="card__content">
        <div className="card__title">{video.snippet.title}</div>
        <div className="card__channel">{video.snippet.channelTitle}</div>
        <div className="card__stats">
          <div className="card__stat">
            <img src="/assets/images/views.png" alt="views" />
            {video.statistics.viewCount}
          </div>
          <div className="card__stat">
            <img src="/assets/images/likes.png" alt="likes" />
            {video.statistics.likeCount}
          </div>
          <div className="card__stat">
            <img src="/assets/images/dislikes.png" alt="dislikes" />
            {video.statistics.dislikeCount}
          </div>
        </div>
      </div>
      <div className="card__button">Подробнее</div>
    </div>
  );
};
