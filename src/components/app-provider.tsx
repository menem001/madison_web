'use client'

import { store } from '@/redux/store'
import { type PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

export function AppProvider(props: PropsWithChildren) {
	return <Provider store={store}>{props.children}</Provider>
}
