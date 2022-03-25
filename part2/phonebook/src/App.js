import { useState, useEffect } from 'react'
import axios from 'axios'



const Filter = ({value, handler}) => <div>filter shown with <input value={value} onChange={handler} /></div>
const PersonForm = ({nameValue, nameHandler, numberValue,numberHandler, formHandler}) =>{
  return (<form>
  <div>
    name: <input value={nameValue} onChange={nameHandler} />
  </div>
  <div>
    number: <input value={numberValue} onChange={numberHandler} />
  </div>
  <div>
    <button type="submit" onClick={formHandler}>add</button>
  </div>
</form>)

}

const Persons = ({persons}) => {
 return persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())): persons

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const filterHandler = (event)=> {
    setFilter(event.target.value)
  }

  const newNameHandler = (event)=> {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }


  const formHandler = (event) => {
    event.preventDefault()


    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))

      setNewName('')
      setNewNumber('')

    }

  }

  return (
    <>
      <h2>Phonebook</h2>

      <Filter value={filter} handler={filterHandler} />
        <h2>add a new</h2>

      <PersonForm nameValue ={newName} nameHandler={newNameHandler} numberValue={newNumber} numberHandler={newNumberHandler} formHandler={formHandler} />
    
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
      
    </>
  )
}

export default App;


