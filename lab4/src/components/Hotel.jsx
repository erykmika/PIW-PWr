import { useParams } from "react-router-dom"
import { getHotel } from "../db"
import { genericDescription } from "../data"
import { Stars } from "../Stars"
import { useState, useEffect } from "react"
import "./Hotel.css"

export default function Hotel() {
    const { slug } = useParams();
    const id = slug;
    const [loading, setLoading] = useState(true)
    const [hotelData, setHotelData] = useState([])

    const fetchData = async () => {

        const res = await getHotel(slug)

        setHotelData(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {loading && <p>loading...</p>}
            {!loading && <>
                <section className="title">
                    <p className="title-text">{hotelData.title}</p>
                </section>
                <section className="hotel-details">
                    {mainImg(id)}
                    <section className="side-box">
                        <section className="hotel-description">
                            <p><span className="bold-header">Location:</span> {hotelData.location}</p>
                            <p><span className="bold-header">Local category:</span> {Stars(hotelData.stars)}</p>
                            <p><span className="bold-header">Price:</span> {hotelData.price}€/room/night</p>
                            <p><span className="bold-header">Description:</span></p>
                            <p>{genericDescription}</p>
                        </section>
                        <button className="contact-btn"><span>Contact</span><span></span></button>
                        {lowerImgs(id)}
                    </section>
                </section>
            </>
            }
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
