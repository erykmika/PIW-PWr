// Print `count` stars for hotel rating
export function Stars(count) {
    let stars = "";
    for (let i = 0; i < count; i++) {
        stars += "★";
    }
    for (let i = 0; i < 5 - count; i++) {
        stars += "☆";
    }
    return stars;
}
