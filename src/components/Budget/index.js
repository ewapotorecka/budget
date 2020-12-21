import React from 'react';
import Display from '../Display';
import Form from '../Form';
import List from '../List';
import './budget.css';


class Budget extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			expenses: this.props.expenses,
			incomes: this.props.incomes,
			budget: this.calculateBudget( this.props.incomes, this.props.expenses ),
			formVisibility: 'hidden'
		}

		this.updateState = this.updateState.bind( this );
	}

	render() {
		return (
			<div className='budget-container'>
				<div className='header-container' style={ this.state.budget > 0 ? { backgroundColor: '#2ed573' } : { backgroundColor: '#ff4757' } }>
					<Display value={ this.state.budget }/>
					<button onClick={ () => this.setState( { formVisibility: 'visible' } ) } className='add-transaction'>Add transaction</button>
				</div>
				<div className='expenses-income-container'>
					<List data={ this.state.expenses } type='expenses' onRemove={ this.updateState }/>
					<List data={ this.state.incomes } type='incomes' onRemove={ this.updateState }/>
				</div>
				<div className='form-container' style={ { visibility: this.state.formVisibility } }>
				<Form onFormSubmit={ this.updateState } onClose={ () => this.setState( { formVisibility: 'hidden' } ) } />
			</div>
			</div>
		);
	}

	calculateBudget( incomes, expenses ) {
		let budget = 0;

		for ( const income of incomes ) {
			budget = budget + income.amount;
		}
		for ( const expense of expenses ) {
			budget = budget - expense.amount;
		}

		return budget;
	}

	updateState( id, type, change, dataObj ) {
		const data = this.state[ type ];
		const element = dataObj;

		if ( change === 'remove' ) {
			for ( let i = 0; i < data.length; i++ ) {

				if ( data[i].id === id ) {
					data.splice( i, 1 );
				}
			}
		} else if ( change === 'add' ) {
			element.id = id;
			element.amount = parseFloat( element.amount );
			data.push( element );
		}


		this.setState( { type: data }, () => {
			this.setState( { budget: this.calculateBudget( this.state.incomes, this.state.expenses ) } );
			localStorage.setItem( type, JSON.stringify( data ) );
			this.setState( { formVisibility: 'hidden' } );
		} );
	}
}

export default Budget;