import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeaturedCard } from "../components/featured_card";
import { response } from "../api/response";
import { Video } from "../types/video.type";
export function CardInfo() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const videoData = response.items.find((item) => item.id === id) || null;
    setVideo(videoData);
  }, [id]);

  if (!video) {
    return <div>Видео не найдено</div>;
  }

  return (
    <div>
      <FeaturedCard video={video} />
    </div>
  );
}
