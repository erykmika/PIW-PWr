import { useParams } from "react-router-dom"
import { getHotel } from "../db"
import { genericDescription } from "../data"
import { Stars } from "../Stars"
import { useState, useEffect, useContext } from "react"
import { FavoriteContext } from "../FavoriteContext"
import ContactDialog from "./Contact"
import "./Hotel.css"



export default function Hotel() {
    const { slug } = useParams();
    const id = parseInt(slug);
    const [loading, setLoading] = useState(true);
    const [hotelData, setHotelData] = useState([]);
    const { state, dispatch } = useContext(FavoriteContext);
    const isFavorite = state.favorites.includes(id);
    const mainCls = "hotel-img " + "img" + id;
    const lowerCls = "img" + id;
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
                    <section className={mainCls}>&nbsp;<div><span>
                        Add to favorites</span><span onClick={toggleFavorite} className={like}></span></div>
                    </section>
                    <section className="side-box">
                        <section className="hotel-description">
                            <p><span className="bold-header">Location:</span> {hotelData.location}</p>
                            <p><span className="bold-header">Local category:</span> {Stars(hotelData.stars)}</p>
                            <p><span className="bold-header">Price:</span> {hotelData.price}€/room/night</p>
                            <p><span className="bold-header">Description:</span></p>
                            <p>{genericDescription}</p>
                        </section>
                        <ContactDialog hotelName={hotelData.title} />
                        <section className="lower-img">
                            <section className={lowerCls}>&nbsp;</section>
                            <section className={lowerCls}>&nbsp;</section>
                        </section>
                    </section>
                </section>
            </>
            }
        </>
    );
}
