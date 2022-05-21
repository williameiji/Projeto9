import styled from "styled-components";

export default function SubtitleColor () {
    return(
        <Subtitle>
            <div>
                <SitSelected></SitSelected>
                <p>Selecionado</p>
            </div>
            <div>
                <SitAvailable></SitAvailable>
                <p>Disponível</p>
            </div>
            <div>
                <SitUnvailable></SitUnvailable>
                <p>Indisponível</p>
            </div>
        </Subtitle>
    );
}

const Subtitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 12px;

        p {
        margin-top: 8px;
        }
    }
`;

const SitSelected = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 17px;
    background-color: #8DD7CF;
    border: 1px solid #45BDB0;
`;

const SitAvailable = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 17px;
    background-color: #C3CFD9;
    border: 1px solid #808F9D;
`;

const SitUnvailable = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 17px;
    background-color: #F7C52B;
    border: 1px solid #F7C52B;
`;