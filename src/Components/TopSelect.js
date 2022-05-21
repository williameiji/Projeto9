import styled from "styled-components";

export default function TopSelect(props) {
    return (
        <Select>
            {props.children}
        </Select>
    );
}

const Select = styled.div`
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 67px auto 0 auto;
    height: 110px;

    p {
        font-size: 24px;
        color: #293845;
    }
`;