import List from 'react-list-select';
import styled from 'styled-components';
const CustomList = ({items, selected, disabled, multiple, onChange}) => {
    return(
        <List items={items}
        selected={[selected]}
        disabled={disabled}
        multiple={multiple}
        onChange={onChange}></List>


    )
}

export default CustomList;