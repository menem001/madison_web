import { useDispatch } from 'react-redux'
import { type store } from '../store'

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
