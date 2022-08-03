const axios = require('axios').default;

export const getPokemon = async (name: string) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const res = await axios.get(url)

    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const getPokemonList = async () => {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=898'
    const res = await axios.get(url)

    return res.data.results
  } catch (e) {
    console.log(e)
  }
}