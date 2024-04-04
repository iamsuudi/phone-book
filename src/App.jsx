import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Hoc from "./hoc/Hoc";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Hoc>
                <Nav />
            </Hoc>
            <Hoc>
                <Footer />
            </Hoc>
        </>
    );
}

export default App;
