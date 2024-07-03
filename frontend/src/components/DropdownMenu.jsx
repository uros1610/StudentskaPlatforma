import React from 'react'

const DropdownMenu = ({fakulteti,smjerovi,handleSmjerChange,handleFakultetChange,handlePredmetChange,predmeti,type}) => {
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

                {!type && <select onChange={handlePredmetChange}>
                    {predmeti.map((predmet) => (
                        <option value = {predmet.imePredmeta}>{predmet.imePredmeta}</option>
                    ))}
                </select>}
                
            </div>
  )
}

export default DropdownMenu
