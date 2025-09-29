import { cache, useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import { TypeCard } from './TypeCard'
import Modal from "./Modal"

export function PokeCard (props) {
    const {selectedPokemon} = props //app.jsx e ekta usestate banano hoise jekhane usestate value 0 deya. mane first object select kora ase. 
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState(null)
    const [loadingSkill, setLoadingSkill] = useState(false)

    const { name, height, abilities, stats, types, moves, sprites } = data|| {}
    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) {return false}
        if (['versions', 'other'].includes(val)) {return false}
        return true
    })

    async function fetchMoveData(move, moveUrl) {
        if (loadingSkill || !localStorage || !moveUrl) { return }

        // check cache for move
        let c = {}
        if (localStorage.getItem('pokemon-moves')) {
            c = JSON.parse(localStorage.getItem('pokemon-moves'))
        }

        if (move in c) {
            setSkill(c[move])
            console.log('Found move in cache')
            return
        }

        try {
            setLoadingSkill(true)
            const res = await fetch(moveUrl)
            const moveData = await res.json()
            console.log('Fetched move from API', moveData)
            const description = moveData?.flavor_text_entries.filter(val => {
                return val.version_group.name == 'firered-leafgreen'
            })[0]?.flavor_text

            const skillData = {
                name: move,
                description
            }
            setSkill(skillData)
            c[move] = skillData
            localStorage.setItem('pokemon-moves', JSON.stringify(c))
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingSkill(false)
        }
    }

    // 01
    // first check the localstorage for the entire dataset with a key name - in this case pokedex where 151 pokemon data exist.
    // to do that we need a empty variable - let cache = {}
    // then if (localStorage.getItem('pokedex') ) {cache = JSON.parse(localStorage.getItem('pokedex'))}

    // 02
    // now cache has the data of 151 pokemon
    // check the specific pokemon data from cache and then put it in setData if (selectedPokemon in cache) { setData(cache[selectedPokemon]) return } 

    //03
    // if no dataSet was not found in step 01 and 02
    // Fetch data from API
    // Starts with an Async Function 
    // the setLoading(true) that will trigger - if (loading || !localStorage) {return}
    // use try{} catch{} finally{}
    // try{ const res = await fetch(finalUrl) 
    // const pokemonData = await res.json() }
    // set the fetched data in setData(pokemonData)
    // connect with cache - cache[selectedPokemon] = pokemonData
        /*example: lets assume that selectedPokemon = 25 and pokemonData = { name: "pikachu", height: 4 }
        then, cache[selectedPokemon] = pokemonData is { 25: { name: "pikachu", height: 4 }}*/
    // Lastly save the info in localstorage - localStorage.setItem('pokedex',JSON.stringify(cache))
   
    useEffect(() => {
            // if loading, exit logic
            if (loading || !localStorage) { return }
            let cache = {}
            if (localStorage.getItem('pokedex')) {
                cache = JSON.parse(localStorage.getItem('pokedex'))
            }

            if (selectedPokemon in cache) {
                setData(cache[selectedPokemon])
                console.log('Found pokemon in cache')
                return
            }


            async function fetchPokemonData() {
                setLoading(true)
                try {
                    const baseUrl = 'https://pokeapi.co/api/v2/'
                    const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                    const finalUrl = baseUrl + suffix
                    const res = await fetch(finalUrl)
                    const pokemonData = await res.json()
                    setData(pokemonData)
                    console.log(pokemonData)
                    cache[selectedPokemon] = pokemonData
                    localStorage.setItem('pokedex', JSON.stringify(cache))
                } catch (err) {
                    console.log(err.message)
                } finally {
                    setLoading(false)
                }
        }

        fetchPokemonData()

    
    }, [selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }
    return (
        <div className='poke-card'>
            <div>
            </div>
            {skill && (<Modal handleCloseModal= {() => {setSkill(null)}}>
                <div>
                    <h6>Name</h6>
                    <h2>{skill.name}</h2> 
                    <h6>Description</h6>
                    <p>{skill.description}</p>
                </div>
            </Modal>)}


            <div>
                <h4>{getFullPokedexNumber(selectedPokemon)} </h4>
                    <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex)=> {
                    return (
                        <TypeCard
                        type={typeObj?.type?.name}
                        key={typeIndex}
                        />
                    )
                })}
            </div>
            <img className="default-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png' }  alt={`${name}-large-img`} />
            <div className="img-container">
                {
                    imgList.map((spriteUrl, spriteIndex) => {
                        const imgUrl = sprites[spriteUrl]
                        return (
                            <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
                        )
                    })
                }
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {
                    stats.map((statObj, statIndex)=>{
                        const {stat, base_stat} = statObj
                        return (
                            <div key={statIndex}>
                                <p>
                                    {stat?.name}
                                </p>
                                <h4>
                                    {base_stat}
                                </h4>
                            </div>
                            
                        )
                    })
                }
            </div>
            <h3>Moves</h3>
            <div className='pokemon-move-grid'>
                {moves.map((moveObj, moveIndex) => {
                    return (
                        <button className='button-card pokemon-move' key={moveIndex} onClick={() => {
                            fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
                        }}>
                            <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}