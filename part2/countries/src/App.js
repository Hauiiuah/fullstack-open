import {useState, useEffect} from 'react'
import axios from 'axios'



const Display = ({country}) => {

  console.log(country)

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map( lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} />
    </>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [countrieFilter, setCountrieFilter]=useState('')
  const [selected,setSelected]=useState(false)

  const filtered = countrieFilter ? countries.filter(country => country.name.common.toLowerCase().includes(countrieFilter.toLowerCase())) : countries
 
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(result => setCountries(result.data))
  },[])



  let display
  if(selected){
    display=<Display country={selected} />
  }
  else{

  
  if(filtered.length > 10){
    display=<p>Too many matches, specify another filter</p>
  }else if(filtered.length ===1 )
  {
    display=<Display country={filtered[0]} />
  }else
  {
    display=filtered.map( country => <p key={country.name.common}>{country.name.common} <button onClick={() => setSelected(country)}>show</button></p>)
  }
  }


  

  return (
    <>
      find countries <input value={countrieFilter} onChange={(event) => {
        setCountrieFilter(event.target.value)
        setSelected(false)
        }} />

      <hr />
      {display}

      

    </>
  )
}

export default App;
