import React, { useState, useEffect } from "react";
import Home from './pages/home/index'
import { getPokemon } from './api'
import './index.css'

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [pokemon, setPokemon] = useState('pikachu')
  const [pokemonData, setPokemonData] = useState([])

  const load = async () => {
    const res = await getPokemon(pokemon)
    setPokemonData(res)
  }

  useEffect(() => {
    load()
  }, [])
  

  return(
    <Home />
    )
}

export default App