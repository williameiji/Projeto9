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


function Forms({ getInputCpf, getInputName, id, addName, addCpf }) {
    return (
        <div className="forms">
            <p>Nome do comprador:</p>
            <input type="text" placeholder="Digite seu nome..."  onChange={(e) => getInputName(e.target.value, id)}></input>
            <p>CPF do comprador:</p>
            <input type="text" placeholder="Digite seu CPF..."  maxLength="11" onChange={getInputCpf} ></input>
        </div>
    );
}

export default function Seats({ setIdSeat, idSeat, section }) {
    let history = useNavigate();

    function handleClick() {
        setIdSeat([]);
        history(`/sessoes/${section}`);
    }

    const { idSeats } = useParams();
    const [renderSeats, setRenderSeats] = useState({});
    const [waiting, setWaiting] = useState(false);
    const [name, setName] = React.useState([]);
    const [cpf, setCpf] = React.useState([]);

    let cpfTemp = {}
    const getInputCpf = (e) => {
        const value = e.target.value;
        cpfTemp ={"cpf" :value};
    }
    
    function addCpf (){
        if(cpfTemp.cpf.length === 11 && !isNaN(Number(cpfTemp.cpf))){
            setCpf([...cpf, [cpfTemp]])
        }else{
            alert("CPF incorreto! Digite somento números");
        }
    }

    let nameTemp ={};

    function getInputName (e, id) {
        console.log(id);
        const value = e;
        console.log(value)
        nameTemp[id] = {["nome"]:value }
    }

    function addName(){
        setName([...name, nameTemp]);
    }

    console.log(name);


    function button () {

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
                <div className="buttonBack" onClick={handleClick}>Voltar</div>
                <p>CINEFLEX</p>
            </TopBar>

            <TopSelect>
                <p className="topSelect">Selecione o(s) assento(s)</p>
            </TopSelect>

            {!waiting ? <img className="loading" src={loading} alt="" /> :
                <>
                    <RenderSits setIdSeat={setIdSeat} idSeat={idSeat} renderSeats={renderSeats} setRenderSeats={setRenderSeats} />

                    <SubtitleColor />

                    {idSeat.map((value, index) => <Forms key={index} id={index} getInputCpf={getInputCpf} getInputName={getInputName} addName={addName} addCpf={addCpf} />)}

                    {!idSeat.length ? null : <div className="button" onClick={button}>{`Reservar assento(s)`}</div>}

                    <Footer>
                        <div className="imgFooter">
                            <img className="imgPoster" src={renderSeats.movie.posterURL} alt="" />
                        </div>
                        <p>{renderSeats.movie.title}</p>
                        <p>{renderSeats.day.weekday} - {renderSeats.name}</p>
                    </Footer>
                </>}
        </>
    );
}