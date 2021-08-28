import {HomeScreen} from './screens';
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar
        main={
          <div className="App">
            <HomeScreen />
          </div>
        }
      />
    </div>
  );
}

export default App;
