import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router, IndexRoute, hashHistory } from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";

// Theme
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
// Components
import Main from "./components/Main";
import About from "./components/About";
import MovementsContainer from "./components/movements/MovementsContainer";
import Movement from "./components/movements/Movement";
import TraineeshipsContainer from "./components/traineeships/TraineeshipsContainer";

// require style
import "../scss/main.scss";
import registerServiceWorker from "./registerServiceWorker";

// Redux Store
import store from "./Store";

import ReactGA from "react-ga";
if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-38322348-3");

  hashHistory.listen((location) => {
    const { pathname, action } = location;
    if (action === "PUSH") {
      ReactGA.pageview(pathname);
    }
  });
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#AB232F",
    primary2Color: "#AB232F",
    primary3Color: "#AB232F",
    accent1Color: "#004354",
    accent2Color: "#004354",
    accent3Color: "#004354",
    textColor: "#004354",
    alternateTextColor: "#FFFFFF"
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={MovementsContainer} />
          <Route path="/:category/:subcategory/:id" component={Movement} />
          <Route path="/traineeships" component={TraineeshipsContainer} />
          <Route path="/about" component={About} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("app")
);

registerServiceWorker();
