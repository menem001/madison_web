import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	scrollTo: 0
}

export type AppDetails = {
	scrollTo: number
}

export const appSlice = createSlice({
	name: 'apps',
	initialState: initialState,
	reducers: {
		setScrollTo(state: AppDetails, action: PayloadAction<number>) {
			state.scrollTo = action.payload
		}
	}
})

export const { setScrollTo } = appSlice.actions
