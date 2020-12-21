import React from 'react';
import './display.css'

class Display extends React.Component {
	render() {
		const value = this.props.value;

		return (
			<div className='display'>
				<h2>Total balance: { value }</h2>
			</div>
		);
	}

}

export default Display;