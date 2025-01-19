import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FeaturedCard } from "../components/featured_card";
import { response } from "../api/response";
import { Video } from "../types/video.type";
import { Header } from "../components/headers";
import "./card_info.scss";

export function CardInfo() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        const videoData = response.items.find((item) => item.id === id) || null;
        setVideo(videoData);
    }, [id]);

    if (!video) {
        return <div className="card-info__error">
            <img
                src="/assets/images/404.svg"
                alt="Error"
                className="card-info__error-image"
            />
            <h2 className="card-info__error-title">Что-то пошло не так...</h2>
            <button
                onClick={() => navigate("/")}
                className="card-info__error-button"
            >
                Вернуться на главную
            </button>
        </div>;
    }

    return (
        <div>
            <Header
                onSearch={() => { }}
                onFilterChange={() => { }}
            />
            <div className="card-info-container">
                <FeaturedCard video={video} />
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
}
