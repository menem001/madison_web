import { type PropsWithChildren, Fragment } from 'react'

export default function Layout(props: PropsWithChildren) {
	return <Fragment>{props.children}</Fragment>
}
