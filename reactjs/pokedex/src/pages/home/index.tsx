import React, { useState, useEffect } from "react"
import Info from '../../components/info'
import FuzzySearch from 'fuzzy-search'
import * as API from './../../api'

import './index.css'

export interface IHomeProps {}

interface IPokemon {
  id: number,
  name: string,
  abilities: [],
  sprites: { front: string, back: string },
  types: [],
  stats: [],
  moves: [],
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const [pokemon, setPokemon] = useState<IPokemon | undefined>(undefined)
  const [originalList, setOriginalList] = useState([])
  const [pokemonList, setPokemonList] = useState([])
  const searcher = new FuzzySearch(originalList, ['name']);
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    getPokemon('bulbasaur')
    getPokemonList()
  }, [])
  
  const getPokemonList = async () => {
    const res = await API.getPokemonList()
    setOriginalList(res)
  }

  const getPokemon = async (req: string) => {
    const res = await API.getPokemon(req)

    const poke = {
      id: res.id,
      name: res.name,
      abilities: res.abilities || [],
      sprites: {
        front: res.sprites.front_default,
        back: res.sprites.back_default
      },
      types: res.types.map((elm: {
        slot: number,
        type: {
          name: string,
          url?: string
        }
      }) => { return(elm.type.name) }),
      stats: res.stats.map((elm: {
        base_stat: 45,
        stat: {
          name: string,
        }
      }) => { return({ name: elm.stat.name, base_stat: elm.base_stat}) }),
      moves: res.moves
    }

    setPokemon(poke)
  }

  const searchOnChange = (arg: string) => {
    setSearch(arg)
    if(arg.length >= 3) {
      setPokemonList(searcher.search(arg))
    }
  }

  const handleSearchElement = (args: string) => {
    setSearch('')
    getPokemon(args)
    setPokemonList([])
  }

  const ButtonClick = (args: string) => {
    const index = pokemon?.id

    if(args === 'previous' && (typeof index === 'number' && index > 1)) {
      return getPokemon(String(index - 1))
    }

    if(args === 'next' && (typeof index === 'number' && index < 898)) {
      return getPokemon(String(index + 1))
    }

    if(args === 'random') {
      const rand = Math.floor(Math.random() * 898) + 1
      return getPokemon(String(rand))
    }
  }

  return (
    <div className="home-container">
      <div className="left-container">
        <div className="name general">
          <h2>{pokemon?.name}</h2>
          <h2>#{pokemon?.id}</h2>
        </div>
        <img className="general" src={pokemon?.sprites.front} alt="" />
        <div className="search general">
          <input className="search-input" onChange={(e) => {searchOnChange(e.target.value)}} value={search} placeholder="inform a name"/>
          {pokemonList.length > 0 && <div className="search-suggestion">
            {pokemonList.map((elm: { name: string, url: string}, key) => {
              return(
                <p key={key} className='search-suggestion-item' onClick={() => handleSearchElement(elm.name)}>{elm.name}</p>
              )
            })}
          </div>}
        </div>
        <div className="button-box">
          <button onClick={() => ButtonClick('previous')} className={`button-box--button ${pokemon?.id === 1 ? 'disabled' : ''}`}>previous</button>
          <button onClick={() => ButtonClick('random')} className="button-box--button">random</button>
          <button onClick={() => ButtonClick('next')} className={`button-box--button ${pokemon?.id === 898 ? 'disabled' : ''}`}>next</button>
        </div>
      </div>
      <div className="right-container general">
        <h2 className="right-header">Info</h2>
        <Info pokemon={pokemon} />
      </div>
    </div>
  )
};

export default Home
