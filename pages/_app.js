import "../styles/globals.css";
import "./mainStyle/style.scss";
import { Provider } from "react-redux";
import store from "../store";
import axios from "axios";

axios.defaults.baseURL = "https://agile-earth-45664.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:5000";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
