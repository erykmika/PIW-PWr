import { useParams } from "react-router-dom"
import hotelData from "./data"
import { genericDescription } from "./data"
import { Stars } from "./Stars"
import Navigation from "./Nav"
import "./Hotel.css"

export default function Hotel() {
    const { slug } = useParams();
    const id = slug;
    return (
        <>
            {Navigation()}
            <section class="title">
                <p class="title-text">{hotelData[id].title}</p>
            </section>
            <section class="hotel-details">
                {mainImg(id)}
                <section class="side-box">
                    <section class="hotel-description">
                        <p><span class="bold-header">Location:</span> {hotelData[id].location}</p>
                        <p><span class="bold-header">Local category:</span> {Stars(hotelData[id].stars)}</p>
                        <p><span class="bold-header">Price:</span> {hotelData[id].price}€/room/night</p>
                        <p><span class="bold-header">Description:</span></p>
                        <p>{genericDescription}</p>
                    </section>
                    <button class="contact-btn"><span>Contact</span><span></span></button>
                    {lowerImgs(id)}
                </section>
            </section>
        </>
    )
}

function mainImg(id) {
    const cls = "hotel-img " + "img" + id;
    return <section class={cls}>&nbsp;<div><span>Add to favorites</span><span></span></div>
    </section>
}

function lowerImgs(id) {
    const cls = "img" + id;
    return <section class="lower-img">
        <section class={cls}>&nbsp;</section>
        <section class={cls}>&nbsp;</section>
    </section>
}
