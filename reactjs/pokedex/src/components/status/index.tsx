import React, { useMemo } from "react"

import './index.css'

export interface IStatus {
  [index: number]: { name: string, base_stat: number };
}

const Status: React.FunctionComponent<IStatus> = (props) => {
  const statusList = useMemo(() => 
    Object.keys(props).map(function(index){
    let status = props[parseInt(index)];
    return status;
  }), [props])

  const normalize = (name: string) => {
    if (name === 'special-attack') return 'sp attack'
    if (name === 'special-defense') return 'sp defense'
    else return name
  }

  const totalStats = () => {
    let total = 0
    statusList.map(elm => {
      total = total + elm.base_stat
    })

    return total
  }

  return (
    <div className="status-container">
      {statusList.map((elm, key) => {
        return(
          <div key={key} className="status-box">
            <p className="status-name">{normalize(elm.name)}</p>
            <p className="status-number">{elm.base_stat}</p>
            <div className="status-bar-box">
              <div className={`status-bar ${elm.name}`} style={{width: `${elm.base_stat / 255 * 100}%`}} />
            </div>
          </div>
        )
      })}
      <p>total: {totalStats()}</p>
    </div>
  )
};

export default Status
