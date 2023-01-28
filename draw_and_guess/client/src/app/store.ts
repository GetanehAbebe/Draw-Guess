import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice'
export const store = configureStore({
  reducer: {
    games: gamesReducer
  },
  middleware:  getDefaultMiddleware({
    serializableCheck: false,
  })
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
