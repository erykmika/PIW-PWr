import { Stars } from "./Stars";

const LikedHotel = (hotel) => {
    return (
        <li key={hotel.id} className="liked-hotel">
            <div>{hotel.location} {hotel.title}</div>
            <div className="lower-liked">
                <span>{Stars(hotel.stars)}</span> <span> ${hotel.price} </span>
            </div>
        </li>
    );
}

export default LikedHotel;