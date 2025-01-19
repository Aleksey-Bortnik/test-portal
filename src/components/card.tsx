import React from "react";
import "./card.scss";

interface CardProps {
  video: {
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: { high: { url: string } };
      publishedAt: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
    };
  };
}
export const Card: React.FC<CardProps> = ({ video }) => {

  const getBorderColor = (publishedAt: string): string => {
    const videoDate = new Date(publishedAt);
    const today = new Date();
    const diffTime = today.getTime() - videoDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays > 180) return "#EB5757";
    if (diffDays > 30) return "#F2C94C";
    if (diffDays > 7) return "#27AE60";
    return "#2F80ED";
  };

  return (
    <div
      className="card"
      style={{
        borderBottom: `5px solid ${getBorderColor(video.snippet.publishedAt)}`,
      }}
    >
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
            <img src="/assets/images/viewed.png" alt="views" />
            {video.statistics.viewCount}
          </div>
          <div className="card__stat">
            <img src="/assets/images/liked.png" alt="likes" />
            {video.statistics.likeCount}
          </div>
          <div className="card__stat">
            <img src="/assets/images/dislike.png" alt="dislikes" />
            {video.statistics.dislikeCount}
          </div>
        </div>
      </div>
      <div className="card__button">Подробнее</div>
    </div>
  );
};
