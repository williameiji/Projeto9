import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import TopSelect from "./TopSelect";
import axios from "axios";
import loading from "../src/assets/image/loading.gif";
import TopBar from "./TopBar";

function Schedule({ weekday, date, showtimes }) {
    return (
        <div className="days">
            <p>{weekday} - {date}</p>
            <div className="showtime">
                {showtimes.map((hour, index) => <Link className="text-link" to={`/assentos/${hour.id}`} key={index}><div className="time" >{hour.name}</div></Link>)}
            </div>
        </div>
    );
}

export default function Sections({ setSection }) {
    let history = useNavigate();

    function handleClick() {
        history("/");
    }

    const { idSection } = useParams();
    const [sections, setSections] = useState({});

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idSection}/showtimes`);
        promise.then(response => {
            setSections(response.data);
            setSection(idSection);
        })
    }, []);

    return (
        <>
            <TopBar>
                <div className="buttonBack" onClick={handleClick}>Voltar</div>
                <p>CINEFLEX</p>
            </TopBar>

            <TopSelect>
                <p>Selecione o horário</p>
            </TopSelect>

            {!sections.days ? <img className="loading" src={loading} alt="" /> : sections.days.map((sect, index) => <Schedule key={index} weekday={sect.weekday} date={sect.date} showtimes={sect.showtimes} />)}

            <Footer>
                <div className="imgFooter">
                    <img className="imgPoster" src={sections.posterURL} alt="" />
                </div>
                <p>{sections.title}</p>
            </Footer>
        </>
    );
}