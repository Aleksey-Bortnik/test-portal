type Thumbnail = {
    "url": string,
    "width": number,
    "height": number
}

export type Video = {
    "kind": "youtube#video",
      "etag": string,
      "id": string,
      "snippet": {
        "publishedAt": string,
        "channelId": string,
        "title": string,
        "description": string
        "thumbnails": {
          "default": Thumbnail
          "medium": Thumbnail
          "high":   Thumbnail
          "standard": Thumbnail
          "maxres": Thumbnail
        },
        "channelTitle": string,
        "tags": string[]
        "categoryId": string,
        "liveBroadcastContent": string,
        "localized": {
          "title": string,
          "description": string,
        },
        "defaultAudioLanguage": string
        defaultLanguage?: string,
      },
      "statistics": {
        "viewCount": string,
        "likeCount": string,
        "dislikeCount": string,
        "favoriteCount": string,
        "commentCount": string,
      },
}