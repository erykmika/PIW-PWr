import { getHotels } from "../db.js";
import { Stars } from "../Stars.js";
import { useEffect, useState, useContext } from "react";
import { FavoriteContext } from "../FavoriteContext.js";

// Single hotel card component
export default function HotelCard(id) {

    const [loading, setLoading] = useState(true);
    const [hotelData, setHotelData] = useState([]);

    const { state, dispatch } = useContext(FavoriteContext);
    const isFavorite = state.favorites.includes(id);

    const [like, setLike] = useState(isFavorite ? "like-on" : "like-off");

    useEffect(() => {
        setLike(isFavorite ? 'like-on' : 'like-off');
    }, [isFavorite]);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: id });
        } else {
            dispatch({ type: 'ADD_FAVORITE', payload: id });
        }
    };

    const fetchData = async () => {

        const res = await getHotels()

        setHotelData([...res]);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                        <div onClick={toggleFavorite} className={`hotel-card-like ${like}`}>
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