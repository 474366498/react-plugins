
// import logo from './logo.svg';
import { useLocation } from 'react-router';
import './App.css';

// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';

import Layout from './components/layout'


/*

function Clock() {
  /* 方式一
  const now = new Date().toLocaleTimeString()
  let [time, setTime] = useState(now)

  function updateTime() {
    const newTime = new Date().toLocaleTimeString()
    setTime(newTime)
  }
  setInterval(() => {
    updateTime()
  }, 1e3);
  
  let now = new Date().getTime()
  let [time, setTime] = useState(now)
  function updateTime() {
    
    setTimeout(() => {
      let newTime = new Date().getTime()
      setTime(newTime)
    }, 1e3);
    
    requestAnimationFrame(() => {
      let newTime = new Date().getTime()
      setTime(newTime)
    })
  }
  updateTime()
  return (<span>clock : {time}</span>)
}

function App() {
  const count = useSelector(state => {
    return state.value
  })
  const [Count, setCount] = useState(3)

  const dispatch = useDispatch()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Clock />
        <div>
          <button onClick={() => dispatch(decrement())}>decrement</button>
          <span>{count}</span>
          <button onClick={() => dispatch(increment())} >increment</button>
          <button onClick={() => dispatch(doublement())}>doublement</button>
        </div>
        <div>
          <button onClick={() => dispatch(asyncMent({ num: Count, fn: false }))}> async decrement </button>
          <input value={Count} onChange={e => setCount(e.target.value)} />
          <button onClick={() => dispatch(asyncMent({ num: Count, fn: true }))} > async increment</button>
        </div>
      </header>
    </div>
  );
}
*/





function App() {
  const location = useLocation()
  console.log(92, location)
  return (
    <Layout />
  )
}


export default App;
