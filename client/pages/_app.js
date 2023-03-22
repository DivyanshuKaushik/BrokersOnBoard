import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import UserProvider from "../context/UserProvider";
import "../styles/globals.css";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import PaginationProvider from "../context/PaginationProvider";

const progress = new ProgressBar({
    size: 4,
    color: "#FF5A5F",
    className: "z-50",
    delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </UserProvider>
    );
}

export default MyApp;
