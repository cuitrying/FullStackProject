import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
const App = () => {
 const [persons, setPersons] = useState([])
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [searchTerm, setSearchTerm] = useState('')

 const [message, setMessage] = useState(null)
 const [messageType, setMessageType] = useState(null)
  useEffect(() => {
   personService
     .getAll()
     .then(initialPersons => {
       setPersons(initialPersons)
     })
 }, [])

 const showNotification = (message, messageType) => {
  setMessage(message)
  setMessageType(messageType)
  setTimeout(() => {
    setMessage(null)
    setMessageType(null)
  }, 5000)
 }

  const addPerson = (event) => {
   event.preventDefault()
   
   const existingPerson = persons.find(p => p.name === newName)
   
   if (existingPerson) {
     if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
       const changedPerson = { ...existingPerson, number: newNumber }
       
       personService
         .update(existingPerson.id, changedPerson)
         .then(returnedPerson => {
           setPersons(persons.map(person => 
             person.id !== existingPerson.id ? person : returnedPerson
           ))
           setNewName('')
           setNewNumber('')
           showNotification(`Updated ${returnedPerson.name}'s number`, 'success')
         })
         .catch(error => {
           showNotification(
             `Information of ${existingPerson.name} has already been removed from server`,
             'error'
           )
           setPersons(persons.filter(p => p.id !== existingPerson.id))
         })
     }
     return
   }
    const personObject = {
     name: newName,
     number: newNumber
   }
    personService
     .create(personObject)
     .then(returnedPerson => {
       setPersons(persons.concat(returnedPerson))
       setNewName('')
       setNewNumber('')
       showNotification(`Added ${returnedPerson.name}`, 'success')
     })
     .catch(error => {
       showNotification('Failed to add person', 'error')
     })
 }
  const deletePerson = (id, name) => {
   if (window.confirm(`Delete ${name}?`)) {
     personService
       .remove(id)
       .then(() => {
         setPersons(persons.filter(person => person.id !== id))
         showNotification(`Deleted ${name}`, 'success')
       })
       .catch(error => {
         showNotification(
           `Information of ${name} has already been removed from server`,
           'error'
         )
         setPersons(persons.filter(p => p.id !== id))
       })
   }
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
   person.name.toLowerCase().includes(searchTerm.toLowerCase())
 )
  return (
   <div>
     <h2>Phonebook</h2>

     {message && (
     <div className={`notification ${messageType}`}>
      {message}
      </div>
     )}
     
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
     
     <Persons 
       persons={personsToShow} 
       deletePerson={deletePerson}
     />
   </div>
  )
}

export default App