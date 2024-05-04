import { getHotels } from "../db.js";
import { Stars } from "../Stars.js";
import { useEffect, useState } from "react";


// Main site component
export default function BrowseHotels() {
    return (
        <>
            <section className="main-title">
                <p className="title-text">Welcome, your tranquility oasis awaits</p>
            </section>

            {Hotels()}
        </>
    )
}

// Hotels component with nested hotel cards
function Hotels() {
    return (<section className="hotels">
        <p className="hotels-title">Explore the hotels</p>
        <div className="full-flex-wid-1th">
            <button className="hotels-search-button">Search by hotel name, place, description etc</button>
        </div>
        <section className="hotel-cards">
            {HotelCard(1)}
            {HotelCard(2)}
            {HotelCard(3)}
            {HotelCard(4)}
        </section>
    </section>);
}

// Single hotel card component
function HotelCard(id) {

    const [loading, setLoading] = useState(true)
    const [hotelData, setHotelData] = useState([])

    const fetchData = async () => {

        const res = await getHotels()

        setHotelData([...res])
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const href = "/hotel/" + String(id);
    const link = <a href={href} ><p>View offer</p></a>;
    return (
        <>
            {loading && <p>loading...</p>}
            {!loading &&
                <article className="hotel-card">
                    <div className="card-img">
                        <div className="hotel-card-location">
                            {hotelData[id - 1].location}
                        </div>
                        <div className="hotel-card-like like-on">
                        </div>
                    </div>
                    <p className="hotel-card-title">
                        {hotelData[id - 1].title}
                    </p>
                    <p className="hotel-card-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis.
                        Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.
                    </p>
                    <div className="hotel-card-details">
                        <div className="stars">
                            {Stars(hotelData[id - 1].stars)}
                        </div>
                        <div className="price">
                            {hotelData[id - 1].price}€/room
                        </div>
                    </div>
                    <div className="full-flex-wid-1th">
                        <button className="view-offer-btn">
                            {link}
                            <div className="btn-arrow"></div>
                        </button>
                    </div>
                </article>
            }</>);
}
