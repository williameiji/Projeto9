import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TopSelect from "./TopSelect";
import TopBar from "./TopBar";
import loading from "../assets/image/loading.gif";

function Posters({ posterImg, idPoster, }) {
    return (
        <PostersMovies>
            <Link to={`/sessoes/${idPoster}`}><ImgPoster src={posterImg} alt="" /></Link>
        </PostersMovies>
    );
}

export default function Movies() {
    const [listMovies, setListMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setListMovies(response.data);
        });
    }, []);

    return (
        <>
            <TopBar>
                <p>CINEFLEX</p>
            </TopBar>

            <TopSelect>
                <p>Selecione o filme</p>
            </TopSelect>

            <BodyMovies>
                {!listMovies.length ? <img className="loading" src={loading} alt="" /> : listMovies.map((img, index) => <Posters key={index} posterImg={img.posterURL} idPoster={img.id} />)}
            </BodyMovies>
        </>
    );
}

const BodyMovies = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 25px 0 25px;
`;

const PostersMovies = styled.div`
    width: 145px;
    height: 209px;
    left: 30px;
    top: 169px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom: 20px;
    padding: 5px;
`;

const ImgPoster = styled.img`
    width: 100%;
    height: 100%;
`;