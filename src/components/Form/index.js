import { useForm } from 'react-hook-form';
import { ReactComponent as Remove } from '../../svg/002-cancel.svg';
import './form.css';

let categories = [ 'Household bills', 'Living costs', 'Finance and insurance', 'Family and friends', 'Travel', 'Leisure', 'Salary', 'Social security', 'Investment and savings', 'Other income' ];

function Form( { onFormSubmit, onClose } ) {
	const { register, handleSubmit, errors, reset } = useForm({ shouldFocusError: false });

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
		onClose();
	}

	return (
		<div className='form' >
			 <form onSubmit={ handleSubmit( onSubmit ) }>
				 <div className='form-header'>
					 <button className='close-button' onClick={ handleClose }><Remove/></button>
				 </div>
				 <div className='form-element-container'>
					<label className='label-title'>Transaction type</label>
					<div>
						<input
							type='radio'
							name='type'
							value='incomes'
							ref={ register( { required: 'Choose the type' } ) }/>
						<label>Income</label>
					</div>
					<div>
						<input
							type='radio'
							name='type'
							value='expenses'
							ref={ register( { required: 'Choose the type'} ) }/>
						<label>Expense</label>
					</div>
					{ errors.type && <p>{ errors.type.message }</p> }
				 </div>
				<div className='form-element-container'>
					<label className='label-title'>Transaction name</label>
					<input
						type='text'
						name='name'
						ref={ register( { required: 'Name is required'} ) }/>
					{ errors.name && <p>{ errors.name.message }</p> }
				</div>
				<div className='form-element-container'>
					<label className='label-title'>Amount</label>
					<input
						type='number'
						name='amount'
						ref={ register( { required: 'Amount is required'} ) }/>
					{ errors.amount && <p>{ errors.amount.message }</p> }
				</div>
				<div className='form-element-container'>
					<label className='label-title'>Category</label>
					<select
						name='category'
						ref={ register() }>
							{ categories.map( ( element ) => {
								return (
									<option	key={ `category_${ element }` } value={ element }>
										{ element }
									</option>
								)
							} ) }
					</select>
				</div>
				<div className='form-element-container submit'>
					<input type='submit' className='submit-button' value='ADD'/>
				</div>
			 </form>
		</div>
	);
}

export default Form;