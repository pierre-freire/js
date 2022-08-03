import React, { useState, useEffect, useMemo } from "react"
import './index.css'

export interface ITypeProps {
  type: string,
}

const Type: React.FunctionComponent<ITypeProps> = (props) => {
  const type = useMemo(() => props.type, [props])

  return (
    <div className={`type-box ${type}`}>
      <h3>{type}</h3>
    </div>
  )
};

export default Type
