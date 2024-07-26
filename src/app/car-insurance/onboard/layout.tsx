export default function Layout(props: React.PropsWithChildren) {
	return (
		<div className='h-screen w-full'>
			<>{props.children}</>
		</div>
	)
}
