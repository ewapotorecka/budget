import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactComponent as Remove } from '../../svg/002-cancel.svg';
import './form.css';

const expensesCategories = [ 'Household bills', 'Living costs', 'Finance and insurance', 'Family and friends', 'Travel', 'Leisure' ];
const incomesCategories = [ 'Salary', 'Social security', 'Investment and savings', 'Other income' ];
let categories = [];
const errorStyles = { border: '1px solid #FF4658', borderRadius: '2px' };

function Form( { onFormSubmit, onClose } ) {
	const { register, handleSubmit, errors, reset } = useForm( { shouldFocusError: false } );
	const [ transactionType, setTransactionType ] = useState( null );
	const formElement = useRef();

	const onSubmit = ( data ) => {
		const id = createId();

		onFormSubmit( id, data.type, 'add', data );
		reset();
	};
	const createId = () => {
		return Math.floor( Math.random() * 1000000 );
	};
	const handleClose = ( event ) => {
		event.preventDefault();
		reset();
		setTransactionType( null );
		onClose();
	}
	const handleTransactionTypeChange = ( value ) => {
		setTransactionType( value );
		value === 'expenses' ? categories = expensesCategories : categories = incomesCategories;
	}

	useClickOutside( formElement, handleClose );

	return (
		<div className='form' ref={ formElement } >
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className='form-header'>
					<button className='close-button' onClick={ handleClose }><Remove /></button>
				</div>
				<div className='form-element-container'>
					<label className='label-title'>Transaction type</label>
					<div className='input-container' style={ errors.type ? errorStyles : null }>
						<div>
							<input
								type='radio'
								name='type'
								value='incomes'
								onChange={ () => handleTransactionTypeChange( 'incomes' ) }
								ref={ register( { required: true } ) } />
							<label>Income</label>
						</div>
						<div>
							<input
								type='radio'
								name='type'
								value='expenses'
								onChange={ () => handleTransactionTypeChange( 'expenses' ) }
								ref={ register( { required: true } ) } />
							<label>Expense</label>
						</div>
					</div>
				</div>
				{ transactionType &&
					<div className='form-element-container'>
						<label className='label-title'>Category</label>
						<div className='input-container'>
							<select
								name='category'
								ref={ register( { required: true } ) }>
								{ categories.map( ( element ) => {
									return (
										<option key={ `category_${ element }` } value={ element }>
											{ element }
										</option>
									)
								} ) }
							</select>
						</div>

					</div> }
				<div className='form-element-container'>
					<label className='label-title'>Transaction name</label>
					<div className='input-container'>
						<input
							type='text'
							name='name'
							style={ errors.name ? errorStyles : null }
							ref={ register( { required: true } ) } />
					</div>

				</div>
				<div className='form-element-container'>
					<label className='label-title'>Amount</label>
					<div className='input-container'>
						<input
							type='number'
							name='amount'
							style={ errors.amount ? errorStyles : null }
							step='any'
							ref={ register( { required: true } ) } />
					</div>
				</div>
				<div className='form-element-container submit'>
					<input type='submit' className='submit-button' value='ADD' />
				</div>
			</form>
		</div>
	);
}

function useClickOutside( elRef, callback ) {
	const callbackRef = useRef();
	callbackRef.current = callback;

	useEffect( () => {
		const handleClickOutside = e => {
			if ( !elRef?.current?.contains( e.target ) && callbackRef.current ) {
				callbackRef.current( e );
			}
		}
		document.addEventListener( 'click', handleClickOutside, true );

		return () => document.removeEventListener( 'click', handleClickOutside, true );
	}, [ callbackRef, elRef ] );
}

export default Form;

