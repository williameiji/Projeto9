import React from "react";
import styled from "styled-components";

export default function RenderSits({ setIdSeat, confirmRemove, idSeat, renderSeats, setRenderSeats, setNumSeats, numSeats, addFields }) {
    function selected(id, idBuyers) {
        let seats = renderSeats.seats.map((value, index) => {
            if (index === id && value.background === "#F7C52B") {
                alert("Esse assento não está disponível.");
                return {
                    ...value,
                }
            }
            if (index === id && value.background === "#8DD7CF") {
                for (let i = 0; i < idSeat.length; i++) {
                    if (idSeat[i] === idBuyers) {
                        idSeat.splice(i, 1);
                        numSeats.splice(i, 1);
                        confirmRemove(i);
                    }
                }
                return {
                    ...value,
                    "background": "#C3CFD9",
                    "border": "1px solid #808F9D"
                }
            }
            if (index === id && value.background !== "#8DD7CF") {
                addFields();
                setIdSeat([...idSeat, idBuyers]);
                setNumSeats([...numSeats, value.name]);
                return {
                    ...value,
                    "background": "#8DD7CF",
                    "border": "1px solid #45BDB0"
                }
            }
            if (value.background === "#F7C52B") {
                return {
                    ...value,
                    "background": "#F7C52B",
                    "border": "1px solid #F7C52B"
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
            <SeatsRender>
                {renderSeats.seats.map((value, index) => <SeatsInd key={index} colorBack={value.background} colorBorder={value.border} onClick={() => selected(Number(value.name) - 1, value.id)}>{value.name}</SeatsInd>)}
            </SeatsRender>
        </>
    );
}

const SeatsRender = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 100hw;
    justify-content: space-around;
    padding: 0 24px;
`;

const SeatsInd = styled.div`
    width: 26px;
    height: 26px;
    background-color: ${props => props.colorBack};
    border: ${props => props.colorBorder};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px 3px;
`;

