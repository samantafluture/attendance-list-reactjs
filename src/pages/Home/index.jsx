import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {
	const [studentName, setStudentName] = useState();
	const [students, setStudents] = useState([]);
	const [user, setUser] = useState({ name: '', avatar: '' });

	function handleAddStudent() {
		// create object
		const newStudent = {
			name: studentName,
			time: new Date().toLocaleTimeString('en', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			}),
		};
		// add object to the state
		// immutability -> don't alter a value, instead substitute as a whole
		setStudents((prevState) => [...prevState, newStudent]);
	}

	// is executed automatically when components are rendered in the screen
  // you can't say its async as you do in a function
	useEffect(() => {
		fetch('https://api.github.com/users/samantafluture')
			.then((response) => response.json())
			.then((data) => {
				setUser({
					name: data.name,
					avatar: data.avatar_url,
				});
			});

      /**
       * *** other way -> async func ***
       * 
       * async function fetchData() {
       *    const response = await fetch('https://api.github.com/users/samantafluture')
       *    const data = await response.json();
       *    
       *    setUser({
       *      name: data.name,
       *      avatar: data.avatar_url,
       *    });
       * }
       * 
       * fetchData();
       * 
       */
	}, []);
	// array of dependence: what are the states that the useEffect depends on
	// if it's empty, it will be executed just one time -> when the interface is rendered
	// if i put some state there, every time the state is updated, the useEffect will be executed again

	return (
		<div className='container'>
			<header>
				<h1>Attendance List</h1>
				<div>
					<strong>{user.name}</strong>
					<img src={user.avatar} alt='profile picture' />
				</div>
			</header>
			<input
				type='text'
				placeholder='Type a name...'
				onChange={(e) => setStudentName(e.target.value)}
			/>
			<button type='button' onClick={handleAddStudent}>
				Add
			</button>

			{students.map((student) => (
				<Card
					key={student.time}
					name={student.name}
					time={student.time}
				/>
			))}
		</div>
	);
}

// hooks -> são funções que permite vc conectar os recursos de estado e ciclo de vida do react, a partir de componentes funcionais
