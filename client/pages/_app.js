import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import UserProvider from "../context/UserProvider";
import "../styles/globals.css";

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
