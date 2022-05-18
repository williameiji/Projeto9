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
    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [section, setSection] = React.useState();

    console.log(idSeat)
    // function addColor() {
    //     let sit = sits.seats.map(value => {
    //         if (value.isAvailable === false) {
    //             return {
    //                 ...value,
    //                 "class": "unvailable"
    //             }
    //         } else {
    //             return {
    //                 ...value,
    //                 "class": "available"
    //             }
    //         }
    //     });
    //     setSitSelected(sit);
    // }

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
                    setCpf={setCpf}
                    setName={setName}
                    section={section}
                />} />
            </Routes>
        </BrowserRouter>
    );
}