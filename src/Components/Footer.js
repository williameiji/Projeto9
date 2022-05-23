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

    p {
        margin-left: 95px;
        font-size: 26px;
    }
`;