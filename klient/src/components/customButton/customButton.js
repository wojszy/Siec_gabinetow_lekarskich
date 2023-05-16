import { Button, View, Text } from 'react-native';
import "./customButton.css";
import styled from 'styled-components';
const CustomButton = ({title, onClick, type, }) => {
    return(

        <button type={type}  className='CustomButton'  onClick={onClick}>{title} 
       
        </button>

    );
}

export default CustomButton