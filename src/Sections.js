import { Link } from "react-router-dom";
import Footer from "./Footer";
import sessoes from "./shared/sessoes";
import TopSelect from "./TopSelect";

function Schedule ({weekday, date, showtimes, id, setIdSetion, addColor }) {
    return (
        <div className="days">
            <p>{weekday} - {date}</p>
            <div className="showtime">
                {showtimes.map((hour, index) => <Link className="text-link" to={`/assentos/${id}`} key={index}><div  className="time" onClick={() => (setIdSetion(id), addColor())}>{hour.name}</div></Link>)}
            </div>
        </div>
    );
}

export default function Sections({ idPoster, setIdSetion, addColor }) {
    return (
        <>
            <TopSelect>
                <p>Selecione o horário</p>
            </TopSelect>

            {sessoes.days.map((sect, index) => <Schedule key={index} weekday={sect.weekday} date={sect.date} showtimes={sect.showtimes} id={sect.id} setIdSetion={setIdSetion} addColor={addColor} />)}

            <Footer>
                <div className="imgFooter">
                    <img className="imgPoster" src={sessoes.posterURL} alt="" />
                </div>
                <p>{sessoes.title}</p>
            </Footer>
        </>
    );
}