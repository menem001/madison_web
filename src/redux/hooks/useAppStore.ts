import { useStore } from 'react-redux'
import { type store } from '../store'

export type AppStore = typeof store

export const useAppStore: () => AppStore = useStore
