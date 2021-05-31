import React, { useState } from 'react';

import './App.css';

function App() {
	const [count, setCount] = useState(0);
	const increment = () => setCount(count + 1);
	const decrement = () => setCount(count - 1);
	return (
		<section className='app-container'>
			<header className='app-header'>Counter App</header>
			<dir className='counter-container'>
				count<span className='count'>{count}</span>
			</dir>
			<dir className='btn-container'>
				<button className='btn btn-inc' onClick={increment}>
					Increment
				</button>
				<button className='btn btn-dec' onClick={decrement}>
					Decrement
				</button>
			</dir>
		</section>
	);
}

export default App;
