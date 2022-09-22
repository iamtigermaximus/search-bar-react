import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import axios from 'axios'

function SearchBar({ placeholder, data }) {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setSearchCountry(e.target.value)
  }

  useEffect(() => {
    axios
      .get('https://disease.sh/v2/countries')
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const filteredCountries = countries.filter((country) => {
    return country.country.toLowerCase().includes(searchCountry.toLowerCase())
  })

  console.log(countries)
  return (
    <div className='search'>
      <div className='searchInputs'>
        <input
          type='text'
          placeholder={placeholder}
          value={searchCountry}
          onChange={handleChange}
        />
      </div>

      <div>
        {filteredCountries.map((country, key) => {
          return <h1>{country.country}</h1>
        })}
      </div>
    </div>
  )
}

export default SearchBar
