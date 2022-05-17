import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/assets/css/reset.css";
import "../src/assets/css/style.css";
import Movies from "./Movies";
import Sections from "./Sections";
import TopBar from "./TopBar";



export default function App() {
    const [idPoster, setIdPoster] = React.useState();


	return (
		<BrowserRouter>
            <TopBar />
			<Routes>
            <Route path="/" element={<Movies setIdPoster={setIdPoster} />} />
            <Route path={`/sessoes/${idPoster}`} element={<Sections idPoster={idPoster} />} />
			</Routes>
		</BrowserRouter>
	);
}