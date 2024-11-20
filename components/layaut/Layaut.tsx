import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const Layaut = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    )
}

export default Layaut;