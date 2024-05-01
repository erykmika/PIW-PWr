import logo from "./logo.svg";
// Navigation links
export default function Navigation() {
    return (<nav class="navigation">
        <img class="logo" src={logo} alt="Logo" />
        <ul class="nav-links">
            <li><a class="nav-link" href="/">Home</a></li>
            <li><a class="nav-link">Find offers</a></li>
            <li><a class="nav-link">Add new offers</a></li>
            <li><a class="nav-link">Favorites</a></li>
            <button class="important-btn">Log out</button>
        </ul>
        <button class="important-btn menu-btn">Menu</button>
    </nav>);
}