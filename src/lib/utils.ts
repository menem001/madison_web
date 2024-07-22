import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { months } from './constants'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getPolicyDateFormat(type: string, date?: Date): string {
	const now = date ? date : new Date()

	const month = months[now.getMonth()]
	const day = now.getDate()
	const year = now.getFullYear()

	const formattedDate = `${month} ${day}, ${year}`
	const formattedEndDate = `${month} ${day}, ${year + 1}`

	return type === 'start' ? formattedDate : formattedEndDate
}

export function formatDateDDMMYYYY(date: Date) {
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	return `${day}/${month}/${year}`
}

export function removeParenthesis(str: string) {
	const regex = /\(.*?\)/g
	const result = str.replace(regex, '')
	return result
}
