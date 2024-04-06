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
            <Hoc>
              <HomePage  query={query}/>
            </Hoc>
            <Footer />
        </>
    );
}

export default App;
