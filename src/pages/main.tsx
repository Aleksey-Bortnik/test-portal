import React, { useState } from "react";
import { Header } from "../components/headers";
import { VideoList } from "../components/video_list";

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortType, setSortType] = useState<string>("newest");

  return (
    <div>
      <Header
        onSearch={setSearchQuery}
        onFilterChange={setSortType}
      />
      <VideoList searchQuery={searchQuery} sortType={sortType} />
    </div>
  );
}
