import { useEffect, useState } from "react";
import Footer from "./Footer";
import RenderSits from "./RenderSits";
import TopSelect from "./TopSelect";
import SubtitleColor from "./SubtitleColor";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import loading from "../src/assets/image/loading.gif";


function Forms({ setCpf, setName }) {
    return (
        <div className="forms">
            <p>Nome do comprador:</p>
            <input type="text" placeholder="Digite seu nome..." onInput={e => setName(e.target.value)}></input>
            <p>CPF do comprador:</p>
            <input type="text" placeholder="Digite seu CPF..." maxLength="11" onInput={e => setCpf(e.target.value)}></input>
        </div>
    );
}

export default function Seats({ setIdSeat, idSeat, setCpf, setName, section }) {
    let history = useNavigate();

    function handleClick() {
        setIdSeat([]);
        history(`/sessoes/${section}`);
    }

    const { idSeats } = useParams();
    const [renderSeats, setRenderSeats] = useState({});
    const [waiting, setWaiting] = useState(false);

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

            {!waiting ? <img className="loading" src={loading} alt=""/> :
                <>
                    <RenderSits setIdSeat={setIdSeat} idSeat={idSeat} renderSeats={renderSeats} setRenderSeats={setRenderSeats} />

                    <SubtitleColor />

                    {idSeat.map((value, index) => <Forms key={index} setCpf={setCpf} setName={setName} />)}

                    {!idSeat.length ? null : <div className="button">{`Reservar assento(s)`}</div>}

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