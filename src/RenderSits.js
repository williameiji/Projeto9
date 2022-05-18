import React from "react";


export default function RenderSits({ setIdSeat, idSeat, renderSeats, setRenderSeats }) {
    function selected(id) {
        let seats = renderSeats.seats.map((value, index) => {
            if (index === id && value.class === "unvailable") {
                alert("Esse assento não está disponível.");
                return {
                    ...value,
                }
            }
            if (index === id && value.class === "selected") {
                idSeat.pop()
                return {
                    ...value,
                    "class": "available",
                }
            }
            if (index === id && value.class !== "selected") {
                setIdSeat([...idSeat, index]);
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
                {renderSeats.seats.map((value, index) => <div key={index} className={value.class} onClick={() => selected((Number(value.name) - 1))}>{value.name}</div>)}
            </div>
        </>
    );
}