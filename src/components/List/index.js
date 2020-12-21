import React from 'react';
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
								<tr>
									<td>{ element.name }</td>
									<td>{ element.category }</td>
									<td>{ element.amount }</td>
									<td>
									<button className='remove-button' onClick={ () => this.handleClick( element.id, this.type ) }>Remove</button>
									</td>
								</tr>
							);
						} ) }
					</tbody>
				</table>
				{/* <div className='content-container'>
					<div className='titles-container'>
						<div className='list-name'><h4>Name</h4></div>
						<div className='list-category'><h4>Category</h4></div>
						<div className='list-amount'><h4>Amount</h4></div>
					</div>
					<div className={`list-content ${this.type}`}>
						{ this.state.data.map( ( element ) => {
							return (
								<div className='content' key={ element.id }>
									<div className='list-name'>{ element.name }</div>
									<div className='list-category'>{ element.category }</div>
									<div className='list-amount'>
										{ element.amount }
										<button className='remove-button' onClick={ () => this.handleClick( element.id, this.type ) }>Remove</button>
									</div>
								</div>
							);
						} ) }
					</div>
				</div> */}
			</div>
		);
	}

	handleClick( id, type ) {
		this.props.onRemove( id, type, 'remove' );
	}
}

export default List;