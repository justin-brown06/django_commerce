import { Header, Footer } from "./components";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar
        main={
          <div className="App">
            <Header />
            eCommerce
            <Footer />
          </div>
        }
      />
    </div>
  );
}

export default App;
