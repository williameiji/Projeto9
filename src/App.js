import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/assets/css/reset.css";
import "../src/assets/css/style.css";
import Movies from "./Movies";
import Sections from "./Sections";
import Seats from "./Seats";
import TopBar from "./TopBar";


export default function App() {
    const [sitSelected, setSitSelected] = React.useState();
    const [idSeat, setIdSeat] = React.useState([]);
    const [section, setSection] = React.useState();

    console.log(idSeat)

    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path={`/sessoes/:idSection`} element={<Sections setSection={setSection} />} />
                <Route path={`/assentos/:idSeats`} element={<Seats
                    sitSelected={sitSelected}
                    setSitSelected={setSitSelected}
                    setIdSeat={setIdSeat}
                    idSeat={idSeat}
                    section={section}
                />} />
            </Routes>
        </BrowserRouter>
    );
}