import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Footer from "./Footer";
import TopSelect from "./TopSelect";
import loading from "../assets/image/loading.gif";
import TopBar from "./TopBar";

function Schedule({ weekday, date, showtimes }) {
    return (
        <Days>
            <p>{weekday} - {date}</p>
            <Showtime>
                {showtimes.map((hour, index) => <Link style={{ textDecoration: 'none' }} to={`/assentos/${hour.id}`} key={index}><Time >{hour.name}</Time></Link>)}
            </Showtime>
        </Days>
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
                <ButtonBack onClick={handleClick}>Voltar</ButtonBack>
                <p>CINEFLEX</p>
            </TopBar>

            <TopSelect>
                <p>Selecione o horário</p>
            </TopSelect>

            {!sections.days ? <img className="loading" src={loading} alt="" /> : sections.days.map((sect, index) => <Schedule key={index} weekday={sect.weekday} date={sect.date} showtimes={sect.showtimes} />)}

            <Footer>
                <ImgFooter>
                    <ImgPoster src={sections.posterURL} alt="" />
                </ImgFooter>
                <p>{sections.title}</p>
            </Footer>
        </>
    );
}

const Days = styled.div`
    height: 70px;
    padding: 25px;

    p {
        font-size: 20px;
        color: #293845;
        margin-bottom: 5px;
    }
`;

const Time = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 83px;
    height: 43px;
    background-color: #E8833A;
    border-radius: 3px;
    margin-right: 10px;
    color: white;

    :last-child {
        margin-bottom: 140px;
    }
`;

const Showtime = styled.div`
    display: flex;
    margin-top: 20px;
    width: 100%;
`;

const ImgPoster = styled.img`
    width: 100%;
    height: 100%;
`;

const ButtonBack = styled.div`
    position: fixed;
    top: 25px;
    left: 15px;
    color: red;
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