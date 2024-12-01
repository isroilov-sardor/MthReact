import React, { useEffect, useState } from 'react'
import { https } from './axios'
import './App.css'
import Github from './components/Github';
import Books from './components/Books';

function App() {
  const [value, setValue] = useState('')
  const [rate, setRate] = useState(null);
  const [res, setRes] = useState(null)

  const API_KEY = 'ff62fd80bc-a64c819b04-snrijc'

  function validateConvert() {
    if (value === '') {
      alert('USD da value kiriting!')
      return false
    }
    if (value.startsWith('-')) {
      alert('manfiy qiymat kiritmang!')
      return false
    }
    return true
  }

  useEffect(function () {
    https.get(`fetch-one?fetch-one?from=USD&to=EUR&api_key=${API_KEY}`)
      .then(response => {
        if (response.status == 200) {
          setRate(response.data.result.EUR)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function handleConverte(e) {
    e.preventDefault();
    const isValid = validateConvert();
    if (!isValid) {
      return
    }
    if (value) {
      const data = (value * rate).toFixed(2);
      setRes(data)
    }
    setValue('')
  }

  return (
    <div className='App'>
      <div className="Same1">
        <div className="container same-container">
          <div className='form'>
            <h1>USD convertation to EUR</h1>
            <input value={value} onChange={(e) => { setValue(e.target.value) }} id='convertInput' type="number" placeholder='USD' />
            <button className='formBtn' onClick={handleConverte}>Convertate</button>
          </div>
          <div className="fr-right">
            <h1>Converting Valuies USD to EUR</h1>
            <div className="card">
              <div className="res">Result:</div>
              <div>£{res}</div>
            </div>
          </div>
        </div>
      </div>
      <Github />
      <Books />
    </div>
  )
}

export default App
