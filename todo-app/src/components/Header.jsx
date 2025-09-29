export function Header (props) {
    const {todos} = props
    const tdLength = todos.length
    const tasksPlural = tdLength != 1
    const pluralOrNot = tasksPlural ? 'tasks' : 'task'
    return(
        <header>
            <h1>
                You have {tdLength} open {pluralOrNot} 
            </h1>
        </header>
       
    )
}