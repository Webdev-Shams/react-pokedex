import ReactDom from 'react-dom'

export default function Modal (props) {
    const { children, handleCloseModal} = props
    return ReactDom.createPortal(
        <div className='modal-container'>
            <button onClick={handleCloseModal}
            className='modal-underlay'/>
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}

/* 
* There is a div with an id = portal in the index.html . so that it can be rendered in any components
* Modal div is added inside portal div with ReactDom.createPortal
* Inside the modal div the contents are dynamic by children props
* That means the modal can be used multiple times with different contents
* It works like a frame 
*/