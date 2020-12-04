import './App.css';
import Budget from './components/Budget';

function App() {
	const expensesStorage = JSON.parse( localStorage.getItem( 'expenses' ) );
	const incomesStorage = JSON.parse( localStorage.getItem( 'incomes' ) );

	return (
		<div className="App">
			<Budget expenses={ expensesStorage ? expensesStorage : [] } incomes={ incomesStorage ? incomesStorage : [] }/>
		</div>
  );
}

export default App;
