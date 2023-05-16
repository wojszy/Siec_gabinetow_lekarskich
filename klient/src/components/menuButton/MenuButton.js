
import "./menuButton.css";

const MenuButton = ({title, onClick, type}) => {
    return(

        <button type={type} onClick={onClick} className='menuButton'>{title} 
       
        </button>

    )
}

export default MenuButton