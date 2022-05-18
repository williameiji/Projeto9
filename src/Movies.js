import { Link } from "react-router-dom";
import TopSelect from "./TopSelect";
import axios from "axios";
import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import loading from "../src/assets/image/loading.gif";

function Posters({ posterImg, idPoster, }) {
    return (
        <div className="posters">
            <Link to={`/sessoes/${idPoster}`}><img className="imgPoster" src={posterImg} alt="" /></Link>
        </div>
    );
}

export default function Movies() {
    const [listMovies, setListMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setListMovies(response.data);
        })
    }, []);
 
    return (
        <>
            <TopBar>
                <p>CINEFLEX</p>
            </TopBar>

            <TopSelect>
                <p>Selecione o filme</p>
            </TopSelect>

            <div className="bodyMovies">
                {!listMovies.length ? <img className="loading" src={loading} alt=""/> : listMovies.map((img, index) => <Posters key={index} posterImg={img.posterURL} idPoster={img.id} />)}
            </div>

        </>
    );
}