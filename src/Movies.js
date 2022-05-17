import { Link } from "react-router-dom";
import listaFilmes from "./shared/lista-filmes";
import TopSelect from "./TopSelect";

function Posters ({posterImg, idPoster, setIdPoster}) {
    return (
            <div className="posters">
                <Link to={`/sessoes/${idPoster}`}><img className="imgPoster" src={posterImg} alt="" onClick={() => setIdPoster(idPoster)}/></Link>
            </div>
    );
}

export default function Movies ({setIdPoster}) {
    return (
        <>
            <TopSelect>
                <p>Selecione o filme</p>
            </TopSelect>

            <div className="bodyMovies">
                {listaFilmes.map((img, index) => <Posters key={index} posterImg={img.posterURL} idPoster={img.id} setIdPoster={setIdPoster}/>)}
            </div>

        </>
    );
}