import React from "react";


export default function RenderSits({ setIdSeat, idSeat, renderSeats, setRenderSeats }) {
    function selected(id, idBuyers) {
        let seats = renderSeats.seats.map((value, index) => {
            if (index === id && value.class === "unvailable") {
                alert("Esse assento não está disponível.");
                return {
                    ...value,
                }
            }
            if (index === id && value.class === "selected") {
                for(let i = 0; i < idSeat.length; i++){
                    if(idSeat[i] === idBuyers){
                        idSeat.splice(i, 1);
                    }
                }
                return {
                    ...value,
                    "class": "available",
                }
            }
            if (index === id && value.class !== "selected") {
                setIdSeat([...idSeat, idBuyers]);
                return {
                    ...value,
                    "class": "selected",
                }
            }
            if (value.class === "unvailable") {
                return {
                    ...value,
                    "class": "unvailable"
                }
            } else {
                return {
                    ...value,
                }
            }
        });
        setRenderSeats({ ...renderSeats, seats });
    }

    return (
        <>
            <div className="sits">
                {renderSeats.seats.map((value, index) => <div key={index} className={value.class} onClick={() => selected(Number(value.name) - 1, value.id)}>{value.name}</div>)}
            </div>
        </>
    );
}