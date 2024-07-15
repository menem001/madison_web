import { Fragment } from 'react'
import { ShowCurrent } from './show-current'

type ShowListProps = {
	data: {
		id: string
		name: string | number
		field: string
	}[]
}

export function ShowList(props: ShowListProps) {
	return (
		<Fragment>
			{props.data.map((item, index) => {
				return (
					<ShowCurrent
						key={item.id}
						index={index}
						item={item}
					/>
				)
			})}
		</Fragment>
	)
}
