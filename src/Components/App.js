import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import Movies from "./Movies";
import Sections from "./Sections";
import Seats from "./Seats";
import TopBar from "./TopBar";
import Finished from "./Finished";
import styled from "styled-components";

export default function App() {
    const [idSeat, setIdSeat] = React.useState([]);
    const [section, setSection] = React.useState();
    const [renderSeats, setRenderSeats] = React.useState({});
    const [numSeats, setNumSeats] = React.useState([]);
    const [cpfNovo, setCpfNovo] = React.useState([]);
    const [inputFields, setInputFields] = React.useState([]);

    return (
        <Body>
            <BrowserRouter>
                <TopBar />
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path={`/sessoes/:idSection`} element={<Sections setSection={setSection} />} />
                    <Route path={`/assentos/:idSeats`} element={<Seats
                        setIdSeat={setIdSeat}
                        idSeat={idSeat}
                        section={section}
                        setRenderSeats={setRenderSeats}
                        renderSeats={renderSeats}
                        setNumSeats={setNumSeats}
                        numSeats={numSeats}
                        setInputFields={setInputFields}
                        inputFields={inputFields}
                        cpfNovo={cpfNovo}
                    />} />
                    <Route path="/sucesso" element={<Finished
                        renderSeats={renderSeats}
                        numSeats={numSeats}
                        setIdSeat={setIdSeat}
                        setNumSeats={setNumSeats}
                        cpfNovo={cpfNovo}
                        inputFields={inputFields}
                        setInputFields={setInputFields}
                    />} />
                </Routes>
            </BrowserRouter>
        </Body>
    );
}

const Body = styled.div`
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
`