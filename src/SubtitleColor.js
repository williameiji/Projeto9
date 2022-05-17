export default function SubtitleColor () {
    return(
        <div className="subtitle">
            <div>
                <div className="sitSelected"></div>
                <p>Selecionado</p>
            </div>
            <div>
                <div className="sitAvailable"></div>
                <p>Disponível</p>
            </div>
            <div>
                <div className="sitUnvailable"></div>
                <p>Indisponível</p>
            </div>
        </div>
    );
}