import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import { type store } from '../store'

type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
