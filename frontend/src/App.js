import { HomeScreen, ProductScreen } from "./screens";
import { Navbar } from "./components/Navbar";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar
        main={
          <div className="App">
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/product/:id" component={ProductScreen}/>
          </div>
        }
      />
    </Router>
  );
}

export default App;
