import { Button, View, Text } from 'react-native';

import pass from "../../img/password.png"
import "./loginInput.css";
import styled from 'styled-components';
const LoginInput = ({type, placeholder, value, onChange}) => {
    return(
        // <div className='divInput'>
      
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="loginInput"/>
        // </div>
    )
}


export default LoginInput
