import HotelCard from "./HotelCard";

// Main site component
export default function BrowseHotels() {
    return (
        <>
            <section className="main-title">
                <p className="title-text">Welcome, your tranquility oasis awaits</p>
            </section>

            <section className="hotels">
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
            </section>
        </>
    )
}

