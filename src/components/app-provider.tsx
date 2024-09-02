'use client'

import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import { type PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

export function AppProvider(props: PropsWithChildren) {
	return (
		<Provider store={store}>
			<SessionProvider>{props.children}</SessionProvider>
		</Provider>
	)
}
