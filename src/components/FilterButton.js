import React from 'react'

function FilterButton(props) {
  return (
    <button type="button" className="button-toggle" onClick={()=>props.setFilter(props.name)}>
      <span>{props.name}</span>
    </button>
  )
}

export default FilterButton
