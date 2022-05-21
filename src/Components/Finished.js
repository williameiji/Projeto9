import styled from "styled-components";
import React from "react";
import TopBar from "./TopBar";
import TopSelect from "./TopSelect";
import { useNavigate } from "react-router-dom";

function RenderBuyers({ name, cpf}) {
    return (
        <>
            <p >Nome: {name}</p>
            <p >CPF: {cpf}</p>
        </>
    );
}

export default function Finished({ renderSeats, inputFields, numSeats, setIdSeat, setNumSeats, cpfNovo, setInputFields }) {
    let history = useNavigate();

    function handleClick() {
        setInputFields([]);
        setNumSeats([]);
        setIdSeat([]);
        history(`/`);
    }

    let dataBuyers = [];

    for (let i = 0; i < inputFields.length; i++) {
        let data = {
            name: inputFields[i].name,
            cpf: cpfNovo[i],
        }
        dataBuyers.push(data);
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
                {dataBuyers.map((value, index) => <RenderBuyers key={index} name={value.name} cpf={value.cpf} />)}
            </Infos>

            <Button onClick={handleClick}>Voltar para Home</Button>
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

const Button = styled.div`
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    margin: 15px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
    margin-bottom: 130px;
`;

