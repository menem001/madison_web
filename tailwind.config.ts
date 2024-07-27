import { type Config } from 'tailwindcss'

const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				gray: {
					66: '#DEDEDE66', // translucentGray
					75: '#D8D8D8',
					90: '#E4E4E4', // Very light gray.
					100: '#FAFAFA', // white
					200: '#F8F8FA', // lightGray
					300: '#E2E8F0', // lightestGray
					350: '#EDEDED',
					400: '#656565', // gray
					425: '#6B6B6B',
					435: '#6D6D6D',
					450: '#B3B3B3',
					500: '#6E6D7A', // slate
					550: '#3D3D3D',
					600: '#221F1F', // dark
					700: '#1A1A1A', // almostBlack
					800: '#818181', // mediumGray
					850: '#908E8E',
					900: '#AFAFAF'
				},
				blue: {
					100: '#D8E4FC', // lightBlue
					200: '#E5E5FE', // lavender
					300: '#0C7BC4', // blue
					350: '#03C3FF',
					400: '#485AFF', // brightBlue
					450: '#1849D6',
					500: '#5452F6', // indigo
					600: '#1E293B', // gunmetal
					700: '#4285F4', // vibrantBlue
					800: '#EDEEFF', // paleBlue
					900: '#337ab7', // Moderate blue
					925: '#2498DBB2'
				},
				green: {
					50: '#11221150', // translucentDarkGreen
					75: '#112211',
					100: '#8DD3BB', // mintGreen
					200: '#06B217', // brightGreen
					300: '#0D8536',
					320: '#0D85361A'
				},
				yellow: {
					100: '#FDEB9D' // paleYellow
				},
				red: {
					100: '#FF8682' // lightRed
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			boxShadow: {
				confirmContainerShadow: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)'
			},
			fontFamily: {
				inter: ['var(--font-inter)'],
				roboto: ['var(--font-roboto)'],
				jakarta: ['var(--font-jakarta)'],
				dmsan: ['var(--font-dmsan)']
			},
			lineHeight: {
				'11': '2.75rem',
				'12': '3rem'
			},
			backgroundImage: {
				travel: 'url("/images/travel.jpeg")',
				boat: 'url("/images/boat.jpeg")',
				personal: 'url("/images/personal.png")'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
