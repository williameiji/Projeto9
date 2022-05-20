import styled from "styled-components";
import TopBar from "./TopBar";
import TopSelect from "./TopSelect";
import { useNavigate } from "react-router-dom";

export default function Finished({ renderSeats, data, numSeats, setIdSeat, setNumSeats }) {
    let history = useNavigate();

    function handleClick() {
        setNumSeats([]);
        setIdSeat([]);
        history(`/`);
    }

    return (
        <>
            <TopBar>
                <p>CINEFLEX</p>
            </TopBar>
            <TopSelect>
                <Paragraph className="topSelect">Pedido feito com sucesso!</Paragraph>
            </TopSelect>
            <Infos>
                <p>Filme e sessão</p>
                <p>{renderSeats.movie.title}</p>
                <p>{renderSeats.day.date} {renderSeats.name}</p>
            </Infos>
            <Infos>
                <p>Ingressos</p>
                {numSeats.map((value, index) => <p key={index}>Assento {value}</p>)}
            </Infos>
            <Infos>
                <p>Comprador</p>
                <p>Nome: {data.name}</p>
                <p>CPF: {data.cpf}</p>
            </Infos>
            <div className="button" onClick={handleClick}>Voltar para Home</div>
        </>
    );
}

const Paragraph = styled.p`
    color: #247A6B;
    font-size: 24px;
    font-weight: bold;
`;

const Infos = styled.div`
    margin-top: 50px;
    padding-left: 20px;
    
    p:first-child {
        margin-top: 10px;
        color: #293845;
        font-size: 24px;
        font-weight: bold;
    }

    p {
        margin-top: 5px;
        color: #293845;
        font-size: 22px;
    }
`;

