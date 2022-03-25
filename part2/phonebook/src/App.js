import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0123-45678' ,id:1},
    { name: 'Jan Haubrock', number: '0123-45678' ,id:2},
    { name: 'Jens Haubrock', number: '0123-45678' , id:3},
    { name: 'Susanne Herrmann', number: '0123-45678' , id:4},
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())): persons

  const addNumber = (event) => {
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

      <div>
        filter shown with <input value={filter} onChange={(event)=> setFilter(event.target.value)} />
      </div>

        <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addNumber}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

export default App;
