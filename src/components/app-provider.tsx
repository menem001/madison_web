'use client'

import { store } from '@/redux/store'
import { type PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

export function AppProvider(props: PropsWithChildren) {
	return (
		<Provider store={store}>
			<SessionProvider>{props.children}</SessionProvider>
		</Provider>
	)
}
