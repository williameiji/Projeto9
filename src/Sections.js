import { Link } from "react-router-dom";
import Footer from "./Footer";
import sessoes from "./shared/sessoes";




function Schedule ({weekday, date, showtimes, id, setIdSetion }) {
    return (
        <div className="days">
            <p>{weekday} - {date}</p>
            <div className="showtime">
                {showtimes.map((hour, index) => <Link to={`/assentos/${id}`} ><div key={index} className="time" onClick={() => setIdSetion(id)}>{hour.name}</div></Link>)}
            </div>
        </div>
    );
}

export default function Sections({ idPoster, setIdSetion }) {
    return (
        <>
            <div className="topSections">
                <p>Selecione o horário</p>
            </div>

            {sessoes.days.map((sect, index) => <Schedule key={index} weekday={sect.weekday} date={sect.date} showtimes={sect.showtimes} id={sect.id} setIdSetion={setIdSetion}/>)}

            <Footer>
                <div className="imgFooter">
                    <img className="imgPoster" src={sessoes.posterURL} alt="" />
                </div>
                <p>{sessoes.title}</p>
            </Footer>
        </>
    );
}