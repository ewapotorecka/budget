import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactComponent as Remove } from '../../svg/002-cancel.svg';
import './form.css';
const expensesCategories = [ 'Household bills', 'Living costs', 'Finance and insurance', 'Family and friends', 'Travel', 'Leisure' ];
const incomesCategories = [ 'Salary', 'Social security', 'Investment and savings', 'Other income' ];
let categories = [];

function Form( { onFormSubmit, onClose } ) {
	const { register, handleSubmit, errors, reset } = useForm({ shouldFocusError: false });
	const [ transactionType, setTransactionType ] = useState( null );

	const onSubmit = ( data ) => {
		const id = createId();

		onFormSubmit( id, data.type, 'add', data );
		reset();
	};
	const createId = () => {
		return Math.floor( Math.random() * 1000000 );
	};
	const handleClose = () => {
		reset();
		setTransactionType( null );
		onClose();
	}
	const handleTransactionTypeChange = ( value ) => {
		setTransactionType( value );
		value === 'expenses' ? categories = incomesCategories : categories = expensesCategories;
	}

	return (
		<div className='form' >
			 <form onSubmit={ handleSubmit( onSubmit ) }>
				 <div className='form-header'>
					 <button className='close-button' onClick={ handleClose }><Remove/></button>
				 </div>
				 <div className='form-element-container'>
					<label className='label-title'>Transaction type</label>
					<div className='input-container'>
						<div>
							<input
								type='radio'
								name='type'
								value='incomes'
								onChange={ () => handleTransactionTypeChange( 'incomes' ) }
								ref={ register( { required: true } ) }/>
							<label>Income</label>
						</div>
						<div>
							<input
								type='radio'
								name='type'
								value='expenses'
								onChange={ () => handleTransactionTypeChange( 'expenses' ) }
								ref={ register( { required: true} ) }/>
							<label>Expense</label>
						</div>
					</div>
					{/* { errors.type && <p>{ errors.type.message }</p> } */}
				 </div>
				 { transactionType &&
				  <div className='form-element-container'>
				  <label className='label-title'>Category</label>
				  <div className='input-container'>
					<select
						name='category'
						ref={ register({ required: true}) }>
							{ categories.map( ( element ) => {
								return (
									<option	key={ `category_${ element }` } value={ element }>
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
							ref={ register( { required: true} ) }/>
					</div>
					
					{/* { errors.name && <p>{ errors.name.message }</p> } */}
				</div>
				<div className='form-element-container'>
					<label className='label-title'>Amount</label>
					<div className='input-container'>
						<input
							type='number'
							name='amount'
							ref={ register( { required: true} ) }/>
					</div>
					
					{/* { errors.amount && <p>{ errors.amount.message }</p> } */}
				</div>
				<div className='form-element-container submit'>
					<input type='submit' className='submit-button' value='ADD'/>
				</div>
			 </form>
		</div>
	);
}

export default Form;