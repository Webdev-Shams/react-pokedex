export function TodoCard (props) {
    const {todo, handleDeleteTodo, todoIndex, handleDoneTodo} = props

    return (
        <div>
            <p>{todo.input}</p>
            <div>
                <button disabled={todo.complete} 
                onClick={()=>{
                    handleDoneTodo(todoIndex)
                }}
                >
                    <h4>Done</h4>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(todoIndex)
                }}>
                    <h4>Delete</h4>
                </button>
            </div>
        </div>
    )
} 