import React, { useState } from "react";
import { VideoList } from "src/components/video_list";
import { Header } from "src/components/headers";

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <VideoList searchQuery={searchQuery} />
    </div>
  );
}
