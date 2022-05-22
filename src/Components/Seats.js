import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";
import RenderSits from "./RenderSits";
import TopSelect from "./TopSelect";
import SubtitleColor from "./SubtitleColor";
import TopBar from "./TopBar";
import loading from "../assets/image/loading.gif";

function Forms({ input, index, handleFormChange, submit }) {
    return (
        <FormsI onSubmit={submit}>
            <div className="forms">
                <p>Nome do comprador:</p>
                <input type="text" name="name" placeholder="Digite seu nome..." onChange={(e) => handleFormChange(index, e)} value={input.name} required></input>
                <p>CPF do comprador:</p>
                <input type="text" name="cpf" placeholder="Digite seu CPF..." maxLength="11" onChange={(e) => handleFormChange(index, e)} value={input.cpf} required onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }} ></input>
            </div>
        </FormsI>
    );
}

export default function Seats({ setIdSeat, idSeat, section, setRenderSeats, renderSeats, setInputFields, inputFields, setNumSeats, numSeats, cpfNovo }) {
    let history = useNavigate();

    function handleClick() {
        setIdSeat([]);
        history(`/sessoes/${section}`);
    }

    const { idSeats } = useParams();
    const [waiting, setWaiting] = useState(false);


    function handleFormChange(index, e) {
        let data = [...inputFields];
        data[index][e.target.name] = e.target.value;
        setInputFields(data);
    }

    function addFields() {
        let newfield = { name: '', cpf: '' }
        setInputFields([...inputFields, newfield]);
    }

    function removeFields(index) {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    }

    function confirmRemove(index) {
        for (let i = 0; i < inputFields.length; i++) {
            if (inputFields[i].name.length > 0 || inputFields[i].cpf.length > 0) {
                if (window.confirm("Deseja remover esse assento?") === true) {
                    removeFields(index);
                }
            }
            if (inputFields[i].name.length === 0 && inputFields[i].cpf.length === 0) {
                removeFields(index);
            }
        }
    }

    function submit() {
        let config = {
            ids: idSeat,
            compradores: []
        }
        for (let i = 0; i < inputFields.length; i++) {
            let temp = {};
            if (inputFields[i].cpf.length === 11 && inputFields[i].name.length > 0) {
                temp = {
                    idAssento: idSeat[i],
                    name: inputFields[i].name,
                    cpf: inputFields[i].cpf
                }

                let cpf = inputFields[i].cpf;
                cpf = cpf.replace(/\D/g, "");
                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
                cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                cpfNovo.push(cpf);

                config.compradores.push(temp);
            } else {
                alert('Dados incorretos!');
            }
        }

        let promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", config);
        promise.then(response => {
            history("/sucesso");
        });
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSeats}/seats`);
        promise.then(response => {
            let seats = response.data.seats.map(value => {
                if (value.isAvailable === false) {
                    return {
                        ...value,
                        "background": "#F7C52B",
                        "border": "1px solid #F7C52B"
                    }
                } else {
                    return {
                        ...value,
                        "background": "#C3CFD9",
                        "border": "1px solid #808F9D"
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

            {!waiting ? <ImgLoading className="loading" src={loading} alt="" /> :
                <>
                    <RenderSits setIdSeat={setIdSeat} idSeat={idSeat} confirmRemove={confirmRemove} addFields={addFields} renderSeats={renderSeats} setRenderSeats={setRenderSeats} setNumSeats={setNumSeats} numSeats={numSeats} />

                    <SubtitleColor />

                    {inputFields.map((input, index) => <Forms key={index} submit={submit} input={input} index={index} handleFormChange={handleFormChange} />)}

                    {!inputFields.length ? null : <Button onClick={submit}>{`Reservar assento(s)`}</Button>}

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

const ImgLoading = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
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