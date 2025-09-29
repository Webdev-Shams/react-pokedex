import { useState } from "react"

export function TodoInput (props) {
    const {handleAdd} = props
    const [inputvalue, setInputValue] = useState('')



    return (
        <div>
            <input placeholder="Add Task" value={inputvalue} onChange={(e)=>{
                setInputValue(e.target.value)
            }} />
            <button onClick={()=> {
                if (!inputvalue) return
                handleAdd(inputvalue)
                setInputValue('')
            }}>
               <span>Add Now</span>
            </button>
        </div>
    )
}