import React from "react"
import Type from "../type";
import Status from "../status";

import './index.css'

export interface IInfo {
  pokemon: {
    id: number,
    name: string,
    abilities: [],
    sprites: { front: string, back: string },
    types: [],
    stats: [],
  } | undefined
}

const Info: React.FunctionComponent<IInfo> = (props) => {
  const normalizeName = (args: string) => {
    return args.replace('-', ' ')
  }

  return (
    <div className="info-container">
      <div className="type-container">
        <p className="type-header">Type</p>
        <div className="type-list">
          {props.pokemon?.types && props.pokemon.types.map((elm, id) => {
            return(
              <Type key={id} type={elm}/>
            )
          })}
        </div>
      </div>
      <div className="abilities">
        <p>Abilities</p>
        <div className="abilities-list">
          {props.pokemon?.abilities.map((elm: { ability: {name: string}, is_hidden: boolean}, id) => {
            if(!elm.is_hidden) return(<h3 key={id}>{normalizeName(elm.ability.name)}</h3>)
          })}
        </div>
        <p className="abilities--hidden">Hidden Abilities</p>
        <div className="abilities-list">
          {props.pokemon?.abilities.map((elm: { ability: {name: string}, is_hidden: boolean}, id) => {
            if(elm.is_hidden) return(<h3 key={id}>{normalizeName(elm.ability.name)}</h3>)
          })}
        </div>
      </div>
      <Status {...props.pokemon?.stats} />
    </div>
  )
};

export default Info
