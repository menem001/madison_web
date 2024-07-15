import { DM_Sans, Inter, Plus_Jakarta_Sans, Roboto } from 'next/font/google'

const roboto = Roboto({
	weight: ['300', '400','500', '700' ],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto'
})

const inter = Inter({
	weight: ['300', '400','500','600', '700' ],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter'
})

const jakarta = Plus_Jakarta_Sans({
	weight: ['300', '400','500','600', '700' ],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-jakarta'
})

const dmsan = DM_Sans({
	weight: ['300', '400','500','600', '700' ],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-dmsan'
})

export const fonts = [roboto, inter, jakarta, dmsan]
