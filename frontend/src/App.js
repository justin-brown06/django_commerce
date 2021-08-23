import { Header, Footer } from "./components";
import {HomeScreen} from './screens';
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar
        main={
          <div className="App">
            <Header />
            <HomeScreen />
            <Footer />
          </div>
        }
      />
    </div>
  );
}

export default App;
