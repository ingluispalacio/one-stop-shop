import Header from "../components/public/Header";
import Main from "../components/public/Main";
import Footer from "../components/public/Footer";
import { CartProvider } from "../contexts/CartContext";

function PublicLayout() {
    return (
        <div className="h-screen w-full flex flex-col bg-gray-100 font-primary">
            <CartProvider>
                <Header />
                <div className="flex-1">
                    <Main />
                </div>
                <Footer />
            </CartProvider>
        </div>
    );
}

export default PublicLayout;
