import React from 'react';
import { ReactComponent as Remove } from '../../svg/001-dustbin.svg';
import './list.css';

class List extends React.Component {
	constructor( props ) {
		super( props );
		this.type = props.type;
		this.state = {
			data: props.data
		}

	}

	render() {
		return (
			<div className='list-container'>
				<h3 className='title'>{ this.type }</h3>
				<table className='styled-table'>
					<thead className={ this.type }>
						<tr>
							<th>Name</th>
							<th>Category</th>
							<th>Amount</th>
							<th></th>
						</tr>
					</thead>
					<tbody className={ `${this.type}-body`}>
					{ this.state.data.map( ( element ) => {
							return (
								<tr key={`${element.name}${element.amount}`}>
									<td>{ element.name }</td>
									<td>{ element.category }</td>
									<td>{ element.amount }</td>
									<td>
									<button className='remove-button' onClick={ () => this.handleClick( element.id, this.type ) }><Remove width='20px' height='20px'/></button>
									</td>
								</tr>
							);
						} ) }
					</tbody>
				</table>
			</div>
		);
	}

	handleClick( id, type ) {
		this.props.onRemove( id, type, 'remove' );
	}
}

export default List;