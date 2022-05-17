import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/assets/css/reset.css";
import "../src/assets/css/style.css";
import Movies from "./Movies";
import Sections from "./Sections";
import Sits from "./Sits";
import TopBar from "./TopBar";
import sits from "./shared/sits";

export default function App() {
    const [idPoster, setIdPoster] = React.useState();
    const [idSection, setIdSetion] = React.useState();
    const [sitSelected, setSitSelected] = React.useState();
    const [idSeat, setIdSeat] = React.useState([]);
    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");

    

    function addColor() {
        let sit = sits.seats.map(value => {
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
        setSitSelected(sit);
    }

    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Movies setIdPoster={setIdPoster} />} />
                <Route path={`/sessoes/${idPoster}`} element={<Sections idPoster={idPoster} setIdSetion={setIdSetion} addColor={addColor} />} />
                <Route path={`/assentos/${idSection}`} element={<Sits idSection={idSection} 
                sitSelected={sitSelected} 
                setSitSelected={setSitSelected} 
                setIdSeat={setIdSeat} 
                idSeat={idSeat} 
                setCpf={setCpf}
                setName={setName}
                />} />
            </Routes>
        </BrowserRouter>
    );
}