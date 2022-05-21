import styled from "styled-components";

export default function TopBar(props) {
    return (
        <Top>
            {props.children}
        </Top>
    );
}

const Top = styled.div`
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 67px;
    left: 0px;
    top: 0px;
    background-color: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
    font-size: 34px;
    color: #E8833A;
    }
`;