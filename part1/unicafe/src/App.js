import {useState} from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({onClick,name}) =><button onClick={onClick}>{name}</button>


const Statistics = ({good,neutral,bad}) =>{

  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positive = (good / sum) * 100
  if(sum){
    return (<>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </>)
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const goodHandler=() => {setGood(good +1)}
  const neutralHandler=() => {setNeutral(neutral+1)}
  const badHandler=() =>{setBad(bad+1)}

  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={goodHandler} name="good" />
      <Button onClick={neutralHandler} name="neutral" />
      <Button onClick={badHandler} name="bad" />

      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App;
