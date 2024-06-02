import { getHotels } from "../db";
import { useState, useEffect, useContext } from "react";
import { FavoriteContext } from "../FavoriteContext";
import LikedHotel from "../LikedHotel";

export default function Favorites() {

    const [loading, setLoading] = useState(true);
    const [hotelData, setHotelData] = useState([]);
    const [liked, setLiked] = useState([]);

    const { state } = useContext(FavoriteContext);

    const fetchData = async () => {
        const res = await getHotels();
        setHotelData(res);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (hotelData.length > 0) {
            setLiked(hotelData
                .filter(hotel => state.favorites.includes(parseInt(hotel.id)))
                .map(hotel => LikedHotel(hotel)));
            setLoading(false);
        }
    }, [hotelData, state.favorites]);

    return (
        <>
            {loading && <p>loading...</p>}
            {!loading &&
                <>
                    <h2 className="hotels-title">Liked hotels</h2>
                    <ul className="liked-hotels">
                        {liked.length ? liked : "None"}
                    </ul>
                </>
            }
        </>
    );
}
