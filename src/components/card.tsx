import React from "react";
import "./card.scss";
import { Video } from "src/types/video.type";
import { useNavigate } from 'react-router-dom';

interface CardProps {
  video: Video;
  isFeatured?: boolean;
}

export const Card: React.FC<CardProps> = ({ video, isFeatured }) => {
  const { snippet, statistics } = video;
    const navigate = useNavigate();
  
    // Переписать через делегирование
    const handleNavigeToCardDetails = () => {
      navigate('/card-info');
    };

  return (
    <div className={`card ${isFeatured ? "featured" : ""}`}>
    
      <img src={snippet.thumbnails.high.url} alt={snippet.title} />

      <div className="card-content">
        <h3>{snippet.title}</h3>
        <p>{snippet.channelTitle}</p>

        <div className="card-stats">
          <span>{statistics.viewCount} просмотров</span>
          <span>{statistics.likeCount} лайков</span>
          <span>{statistics.dislikeCount} дизлайков</span>
          <span>{statistics.commentCount} комментариев</span>
        </div>

        <button className="card-next-btn" onClick={handleNavigeToCardDetails}>Далее</button>
      </div>
    </div>
  );
};
