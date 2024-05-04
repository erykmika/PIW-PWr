
import { useOutletContext, useParams } from "react-router-dom";
import { genericDescription } from "../data"
import { Stars } from "../Stars"
import "./Hotel.css"

export default function Hotel() {
    const [hotelData, setHotelData] = useOutletContext();
    const { slug } = useParams();
    const id = slug - 1;
    return (
        <>
            <section className="title">
                <p className="title-text">{hotelData[id].title}</p>
            </section>
            <section className="hotel-details">
                {mainImg(id + 1)}
                <section className="side-box">
                    <section className="hotel-description">
                        <p><span className="bold-header">Location:</span> {hotelData[id].location}</p>
                        <p><span className="bold-header">Local category:</span> {Stars(hotelData[id].stars)}</p>
                        <p><span className="bold-header">Price:</span> {hotelData[id].price}€/room/night</p>
                        <p><span className="bold-header">Description:</span></p>
                        <p>{genericDescription}</p>
                    </section>
                    <button className="contact-btn"><span>Contact</span><span></span></button>
                    {lowerImgs(id + 1)}
                </section>
            </section>
        </>
    );
}

function mainImg(id) {
    const cls = "hotel-img " + "img" + id;
    return <section className={cls}>&nbsp;<div><span>Add to favorites</span><span></span></div>
    </section>
}

function lowerImgs(id) {
    const cls = "img" + id;
    return <section className="lower-img">
        <section className={cls}>&nbsp;</section>
        <section className={cls}>&nbsp;</section>
    </section>
}
