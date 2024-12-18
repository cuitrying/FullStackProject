import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'


const App = () => {
 const [persons, setPersons] = useState([]) 
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
    .catch(error => {
      console.log('error fetching data')
    })
  }, [])

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