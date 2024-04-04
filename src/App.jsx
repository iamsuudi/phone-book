import Footer from "./components/Footer";
import HomePage from "./components/Home";
import Nav from "./components/Nav";
import Hoc from "./hoc/Hoc";
import { useState } from "react";

function App() {

    const [query, setQuery] = useState('');

    return (
        <>
            <Hoc>
                <Nav setQuery={setQuery}/>
            </Hoc>
            <Hoc>
              <HomePage  query={query}/>
            </Hoc>
            <Hoc>
                <Footer />
            </Hoc>
        </>
    );
}

export default App;
