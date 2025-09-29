export function Tabs (props) {
    const {todos, selectTab, setSelectTab} = props
    
    const tabs = ['All', 'Open', 'Complete']
    return (
        <nav>
            {tabs.map((tab,tabIndex) => {
                const numOfTasks = tab === 'All' ? todos.length 
                : tab === 'Open' ? todos.filter(todo => !todo.complete).length 
                : todos.filter(todo => todo.complete).length 
                return (
                    <button 
                    onClick={() => {
                        setSelectTab(tab)
                    }}
                    className={(tab === selectTab ? 
                        'tab-selected' : ' '
                    )}
                    key={tabIndex} 
                    >
                        {tab} ({numOfTasks})
                    </button>
                )
            })}
        </nav>
    )
}