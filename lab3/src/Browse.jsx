import hotelData from "./data.js";
import Navigation from "./Nav.jsx";
import { Stars } from "./Stars.js";
import "./App.css";


// Main site component
export default function BrowseHotels() {
    return (
        <>
            {Navigation()}

            <section class="main-title">
                <p class="title-text">Welcome, your tranquility oasis awaits</p>
            </section>

            {Hotels()}
        </>
    )
}

// Hotels component with nested hotel cards
function Hotels() {
    return (<section class="hotels">
        <p class="hotels-title">Explore the hotels</p>
        <div class="full-flex-width">
            <button class="hotels-search-button">Search by hotel name, place, description etc</button>
        </div>
        <section class="hotel-cards">
            {HotelCard(1)}
            {HotelCard(2)}
            {HotelCard(3)}
            {HotelCard(4)}
        </section>
    </section>);
}

// Single hotel card component
function HotelCard(id) {
    const href = "/hotel/" + String(id);
    const link = <a href={href} ><p>View offer</p></a>;
    return (<article class="hotel-card">
        <div class="card-img">
            <div class="hotel-card-location">
                {hotelData[id].location}
            </div>
            <div class="hotel-card-like like-on">
            </div>
        </div>
        <p class="hotel-card-title">
            {hotelData[id].title}
        </p>
        <p class="hotel-card-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis.
            Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.
        </p>
        <div class="hotel-card-details">
            <div class="stars">
                {Stars(hotelData[id].stars)}
            </div>
            <div class="price">
                {hotelData[id].price}€/room
            </div>
        </div>
        <div class="full-flex-width">
            <button class="view-offer-btn">
                {link}
                <div class="btn-arrow"></div>
            </button>
        </div>
    </article>);
}
