import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'


const App = () => {
 const [persons, setPersons] = useState([
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
 ]) 
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
 }
  const handleNameChange = (event) => {
   setNewName(event.target.value)
 }

 const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
 }

 const handleSearchChange = (event) => {
  setSearchTerm(event.target.value)
 }

 const personsToShow = persons.filter(person =>
 person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
   <div>
     <h2>Phonebook</h2>
     
     <Filter 
      searchTerm={searchTerm} 
      handleSearchChange={handleSearchChange} 
     />
     
     <h3>Add a new</h3>
     <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange} 
     />
     
     <h3>Numbers</h3>
     <Persons persons={personsToShow} />
   </div>
 )
}

export default App