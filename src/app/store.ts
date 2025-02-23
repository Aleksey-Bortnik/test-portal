import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './slice/video.slice'
export const store = configureStore({
  reducer: {
    videoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
