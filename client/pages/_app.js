import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import UserProvider from "../context/UserProvider";
import Head from "next/head";
import "../styles/globals.css";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import PaginationProvider from "../context/PaginationProvider";

// sweetalert css 
import 'sweetalert2/src/sweetalert2.scss'

const progress = new ProgressBar({
    size: 4,
    color: "#FF7D03",
    className: "z-50",
    delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
    return (
        <>
             <Head> 
                <title>Brokers On Board | Home - Best Real State Services</title>
                {/* favicon */}
                <link rel="icon" href="/favicon.ico" />
             </Head>
            <UserProvider>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </UserProvider>
        </>
    );
}

export default MyApp;
