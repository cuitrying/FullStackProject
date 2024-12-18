import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (searchTerm) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const filtered = response.data.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
          setCountries(filtered)
        })
    } else {
      setCountries([])
    }
  }, [searchTerm])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const displayCountryInfo = (country) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>

        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          width="150"
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
      </div>

      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {countries.length <= 10 && countries.length > 1 && (
        <div>
          {countries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
            </div>
          ))}
        </div>
      )}

      {countries.length === 1 && displayCountryInfo(countries[0])}
    </div>
  )
}

export default App
