import { TodoCard } from "./TodoCard"

export function TodoList (props) {
    const {todos, selectTab} = props

    const currentTab = selectTab === 'All' ? todos 
    : selectTab === 'Complete' ? todos.filter(value => value.complete) : todos.filter(value => !value.complete)
    return (
        <>
            {
             currentTab.map((todo, todoIndex)=>{
                return (
                    <TodoCard 
                    key={todoIndex} 
                    todoIndex={todos.findIndex(val => val.input == todo.input)}
                    {...props}
                    todo={todo} 
                    />
                )
             })   
            }
        </>
    )
}