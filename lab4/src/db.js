import { db } from "./firebase.utils";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

// Get all hotels data
const getHotels = async () => {

    const doc_refs = await getDocs(collection(db, "hotels"))

    const res = []

    doc_refs.forEach(country => {
        res.push({
            id: country.id,
            ...country.data()
        })
    })
    console.log(res);
    return res
}

// Get specific hotel data by id
const getHotel = async (id) => {
    const docRef = doc(db, "hotels", String(id));
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export { getHotels, getHotel };