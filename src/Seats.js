import { useEffect, useState } from "react";
import React from "react";
import Footer from "./Footer";
import RenderSits from "./RenderSits";
import TopSelect from "./TopSelect";
import SubtitleColor from "./SubtitleColor";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import loading from "../src/assets/image/loading.gif";
import styled from "styled-components";

function Forms({ data, handleForm }) {
    return (
        <FormsI>
            <div className="forms">
                <p>Nome do comprador:</p>
                <input type="text" name="name" placeholder="Digite seu nome..." onChange={handleForm} value={data}></input>
                <p>CPF do comprador:</p>
                <input type="text" name="cpf" placeholder="Digite seu CPF..." maxLength="11" onChange={handleForm} value={data} required onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }} ></input>
            </div>
        </FormsI>
    );
}

export default function Seats({ setIdSeat, idSeat, section, setRenderSeats, renderSeats, setData, data, setNumSeats, numSeats }) {
    let history = useNavigate();

    function handleClick() {
        setIdSeat([]);
        history(`/sessoes/${section}`);
    }

    const { idSeats } = useParams();
    const [waiting, setWaiting] = useState(false);

    function handleForm(e) {
        setData({
            ...data,
            ids: idSeat,
            [e.target.name]: e.target.value,
        });
    }

    function submit() {
        if (data.cpf.length === 11 && data.name.length > 0) {
            let promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", data);
            promise.then(response => {
                history("/sucesso");
            })
        }
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSeats}/seats`);
        promise.then(response => {
            let seats = response.data.seats.map(value => {
                if (value.isAvailable === false) {
                    return {
                        ...value,
                        "class": "unvailable"
                    }
                } else {
                    return {
                        ...value,
                        "class": "available"
                    }
                }
            });
            setRenderSeats({ ...response.data, seats });
            setWaiting(true);
        })
    }, []);

    return (
        <>
            <TopBar>
                <ButtonBack onClick={() => handleClick(idSeat)}>Voltar</ButtonBack>
                <p>CINEFLEX</p>
            </TopBar>

            <TopSelect>
                <p className="topSelect">Selecione o(s) assento(s)</p>
            </TopSelect>

            {!waiting ? <img className="loading" src={loading} alt="" /> :
                <>
                    <RenderSits setIdSeat={setIdSeat} idSeat={idSeat} renderSeats={renderSeats} setRenderSeats={setRenderSeats} setNumSeats={setNumSeats} numSeats={numSeats} />

                    <SubtitleColor />

                    <Forms handleForm={handleForm} />

                    <Button onClick={submit}>{`Reservar assento(s)`}</Button>

                    <Footer>
                        <ImgFooter>
                            <ImgPoster src={renderSeats.movie.posterURL} alt="" />
                        </ImgFooter>
                        <p>{renderSeats.movie.title}</p>
                        <p>{renderSeats.day.weekday} - {renderSeats.name}</p>
                    </Footer>
                </>}
        </>
    );
}

const FormsI = styled.form`
    margin: 25px 35px 0 24px;

    label {
        font-size: 18px;
    }

    input {
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        padding-left: 15px;
        margin: 5px 0;

        ::placeholder {
            font-size: 18px;
            font-style: italic;
            color: #AFAFAF;
            padding-left: 15px;
        }
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

const ImgPoster = styled.img`
    width: 100%;
    height: 100%;
`;

const ImgFooter = styled.div`
    position: absolute;
    bottom: 6px;
    left: 6px;
    width: 64px;
    height: 89px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 8px;
`;

const ButtonBack = styled.div`
    position: fixed;
    top: 25px;
    left: 15px;
    color: red;
`;