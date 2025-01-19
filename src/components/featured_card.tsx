import React from "react";
import "./featured_card.scss";

interface FeaturedCardProps {
  video: {
    snippet: {
      title: string;
      description: string;
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

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ video }) => {
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
      className="featured-card"
      style={{
        borderBottom: `5px solid ${getBorderColor(video.snippet.publishedAt)}`,
      }}
    >
      <img
        className="featured-card__thumbnail"
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
      />
      <div className="featured-card__content">
        <h2 className="featured-card__title">{video.snippet.title}</h2>
        <p className="featured-card__description">{video.snippet.description}</p>
        <div className="featured-card__stats">
          <div className="featured-card__stat">
            <img src="/assets/images/viewed.png" alt="views" />
            {video.statistics.viewCount}
          </div>
          <div className="featured-card__stat">
            <img src="/assets/images/liked.png" alt="likes" />
            {video.statistics.likeCount}
          </div>
          <div className="featured-card__stat">
            <img src="/assets/images/dislike.png" alt="dislikes" />
            {video.statistics.dislikeCount}
          </div>
        </div>
      </div>
    </div>
  );
};
