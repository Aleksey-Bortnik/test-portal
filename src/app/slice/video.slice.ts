import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Video } from 'src/types/video.type'

export interface VideoState {
  videos: Video[]
}

const initialState: VideoState = {
  videos: [],
}

export const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    fetchVideos: (state: VideoState, action: PayloadAction<Video[]>) => {
      state.videos = action.payload
    },
  },
})

export const { fetchVideos } = videoSlice.actions

export default videoSlice.reducer
