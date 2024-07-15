import { cn } from '@/lib'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import {
	type ComponentProps,
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactNode
} from 'react'

const Breadcrumb = forwardRef<
	HTMLElement,
	ComponentPropsWithoutRef<'nav'> & {
		separator?: ReactNode
	}
>(({ ...props }, ref) => (
	<nav
		ref={ref}
		aria-label='breadcrumb'
		{...props}
	/>
))

Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(
	({ className, ...props }, ref) => (
		<ol
			ref={ref}
			className={cn(
				'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
				className
			)}
			{...props}
		/>
	)
)

BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
	({ className, ...props }, ref) => (
		<li
			ref={ref}
			className={cn('inline-flex items-center gap-1.5', className)}
			{...props}
		/>
	)
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = forwardRef<
	HTMLAnchorElement,
	ComponentPropsWithoutRef<'a'> & {
		asChild?: boolean
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : 'a'

	return (
		<Comp
			ref={ref}
			className={cn('transition-colors hover:text-foreground', className)}
			{...props}
		/>
	)
})

BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
	({ className, ...props }, ref) => (
		<span
			ref={ref}
			aria-current='page'
			aria-disabled='true'
			className={cn('font-normal text-foreground', className)}
			role='link'
			{...props}
		/>
	)
)

BreadcrumbPage.displayName = 'BreadcrumbPage'

function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
	return (
		<li
			aria-hidden='true'
			className={cn('[&>svg]:size-3.5', className)}
			role='presentation'
			{...props}>
			{children ?? <ChevronRight />}
		</li>
	)
}

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span
			aria-hidden='true'
			className={cn('flex h-9 w-9 items-center justify-center', className)}
			role='presentation'
			{...props}>
			<MoreHorizontal className='h-4 w-4' />
			<span className='sr-only'>More</span>
		</span>
	)
}

BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis'

export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
}
