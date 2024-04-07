import Footer from "./components/Footer";
import HomePage from "./components/Home";
import Nav from "./components/Nav";
import Hoc from "./hoc/Hoc";
import { useState } from "react";

function App() {

    const [query, setQuery] = useState('');

    return (
        <>
            <Nav setQuery={setQuery}/>
            <HomePage  query={query}/>
            <Footer />
        </>
    );
}

export default App;
