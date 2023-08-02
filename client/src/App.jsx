import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./componets/LandingPage/LandingPage";
import Home from "./componets/Home/Home";
import Detail from "./componets/Detail/Detail";
import CreateDog from "./componets/Post/CreateDog";
import About from "./componets/About/About";


function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/home/:id" component={Detail} />
            <Route exact path="/create" component={CreateDog} />
            <Route exact path="/about" component={About} />
           
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
