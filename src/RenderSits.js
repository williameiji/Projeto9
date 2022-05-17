import React from "react";

export default function RenderSits({ sitSelected, setSitSelected, setIdSeat, idSeat }) {
    function selected(id) {
        let select = sitSelected.map((value, index) => {
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
        setSitSelected(select);
    }

    return (
        <>
            <div className="sits">
                {sitSelected.map((value, index) => <div key={index} className={value.class} onClick={() => selected((value.id - 1))}>{value.name}</div>)}
            </div>
        </>
    );
}