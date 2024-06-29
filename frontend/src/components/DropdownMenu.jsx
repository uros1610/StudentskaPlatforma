import React from 'react'

const DropdownMenu = ({fakulteti,smjerovi,handleSmjerChange,handleFakultetChange}) => {
  return (
    <div className = "selectDiv">
                <select onChange={handleFakultetChange}>
                    {fakulteti.map((fakultet) => (
                        <option value = {fakultet.imeFakulteta}>{fakultet.imeFakulteta}</option>
                    ))}
                </select>
                
                <select onChange={handleSmjerChange}>
                    {smjerovi.map((smjer) => (
                        <option value = {smjer.imeSmjera}>{smjer.imeSmjera}</option>
                    ))}
                </select>
            </div>
  )
}

export default DropdownMenu