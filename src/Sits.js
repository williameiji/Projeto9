import React from "react";
import Footer from "./Footer";
import RenderSits from "./RenderSits";
import TopSelect from "./TopSelect";
import sits from "./shared/sits";
import SubtitleColor from "./SubtitleColor";

function Forms ({setCpf, setName}) {
    return (
        <div className="forms">
            <p>Nome do comprador:</p>
            <input type="text" placeholder="Digite seu nome..." onInput={e => setName(e.target.value)}></input>
            <p>CPF do comprador:</p>
            <input type="text" placeholder="Digite seu CPF..." onInput={e => setCpf(e.target.value)}></input>
        </div>
    );
}

export default function Sits({ idSection, sitSelected, setSitSelected, setIdSeat, idSeat, setCpf, setName}) {
    return (
        <>
            <TopSelect>
                <p>Selecione o(s) assento(s)</p>
            </TopSelect>

            <RenderSits sitSelected={sitSelected} setSitSelected={setSitSelected} setIdSeat={setIdSeat} idSeat={idSeat} />

            <SubtitleColor />

            <Forms setCpf={setCpf} setName={setName} />

            <div className="button">{`Reservar assento(s)`}</div>

            <Footer>
                <div className="imgFooter">
                    <img className="imgPoster" src={sits.movie.posterURL} alt="" />
                </div>
                <p>{sits.movie.title}</p>
                <p>{sits.day.weekday} - {sits.name}</p>
            </Footer>
        </>
    );
}