import { Link } from "react-router-dom";
import listaFilmes from "./shared/lista-filmes";

function Posters ({posterImg, idPoster, setIdPoster}) {
    return (
            <div className="posters">
                <Link to="/contato"><img className="imgPoster" src={posterImg} alt="" onClick={() => setIdPoster(idPoster)}/></Link>
            </div>
    );
}


export default function Movies ({setIdPoster}) {
    return (
        <>
            <div className="topMovies">
                <p>Selecione o filme</p>
            </div>
            <div className="bodyMovies">
                {listaFilmes.map((img, index) => <Posters key={index} posterImg={img.posterURL} idPoster={img.id} setIdPoster={setIdPoster}/>)}
            </div>

        </>
    );
}