import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export function SideNav (props) {
    const {selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu} = props
    const [searchValue, setSearchValue] = useState ('')
    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        // if(toString(getFullPokedexNumber(eleIndex)).includes(searchValue)) {return true}
        if(getFullPokedexNumber(eleIndex).includes(searchValue)) {return true}

        if(ele.toLowerCase().includes(searchValue.toLowerCase())) {return true}

        return false
    })

    return (
        <nav className={' ' + (!showSideMenu ? " open" : '')}>
            <div className={"header" + (!showSideMenu ? " open" : '')}>
                <button onClick={handleToggleMenu} className="open-nav-button">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="text-gradient">
                    Pokedex
                    
                </h1>
            </div> 
            <input value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} />

            {
                filteredPokemon.map((pokemon, pokemonIndex) => {
                    const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                    return (
                        <button onClick={() => {setSelectedPokemon(truePokedexNumber)}} className={'nav-card ' + (pokemonIndex === selectedPokemon ? 'nav-card-selected' : ' ')} key={pokemonIndex}>
                            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                            {pokemon}
                        </button>
                    )
                })
                
            }
        </nav>
    )
}
