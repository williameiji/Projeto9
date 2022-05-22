import styled from "styled-components";

export default function Footer (props) {
    return (
        <FooterF >
            {props.children}
        </FooterF>
    );
}

const FooterF = styled.div`
    position: fixed;
    width: 100%;
    height: 117px;
    left: 0px;
    bottom: 0px;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 0 15px;

    p {
        margin-left: 85px;
        font-size: 26px;
        word-wrap: break-word;
        padding: 0 10px 0 0;
    }
`