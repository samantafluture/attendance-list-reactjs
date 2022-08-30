import React, { useState } from 'react';
import './styles.css'

import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);

  function handleAddStudent() {
    // create object
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("en", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    // add object to the state
    // immutability -> don't alter a value, instead substitute as a whole
    setStudents(prevState => [...prevState, newStudent]);
  }

  return (
    <div className="container">
      <h1>Attendance List</h1>
      <input 
        type="text" 
        placeholder="Type a name..." 
        onChange={e => setStudentName(e.target.value)}
        />
      <button type="button" onClick={handleAddStudent}>
        Add
      </button>

      {
        students.map(student => (
        <Card 
          key={student.time}
          name={student.name}
          time={student.time} 
          />
        ))
      }
    </div>
  )
}
