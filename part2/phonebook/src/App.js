import { useState, useEffect } from 'react'
import PersonService from './services/PersonService'



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

const Notification = ({msg}) => {
  if(msg === null) {
    return null
  }

  return (
    <div className={msg.success ? 'success' : 'error' }>
      {msg.message}
    </div>
  )
}


const Persons = ({persons, removeCallback}) => {
 return persons.map((person) => <p key={person.name}>{person.name} {person.number} <button onClick={()=>removeCallback(person)}>Delete</button></p>)
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())): persons

  useEffect(() => {
    PersonService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }
    )
  },[])

  const removePerson = (person) =>{
    if(window.confirm(`Delete ${person.name}`))
    {
      PersonService.removePerson(person.id).catch(error => {
        setMessage({message:`Information of ${person.name} has already removed from server`,success:false})
        setTimeout(()=>setMessage(null),5000)
      }
        
      )
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

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


    const newPerson = {
      name: newName,
      number: newNumber
    }
    const existingPerson =persons.find(person => person.name === newName)
    if (existingPerson) {
      if(window.confirm(`${newPerson.name} already exist, replace PhoneNumber?`)) {
        PersonService.update(existingPerson.id,newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
      }
    }
    else {
      PersonService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          
        })
        setMessage({message:`${newPerson.name} succesfull added`,success: true })
        setTimeout(()=> setMessage(null),5000)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification msg={message} />
      <Filter value={filter} handler={filterHandler} />
        <h2>add a new</h2>

      <PersonForm nameValue ={newName} nameHandler={newNameHandler} numberValue={newNumber} numberHandler={newNumberHandler} formHandler={formHandler} />
    
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removeCallback={removePerson}/>
      
    </>
  )
}

export default App;


