import React from "react";
import { render } from "react-dom";
// import Hello from "./Hello";
import TokenTable from "./components/TokenTable";
import NewTokenList from './components/NewTokenList'

const styles = {
  fontFamily: "sans-serif",
  textAlign: "",
  margin: "30px"
};

const App = () => (
  <div style={styles}>
    <h1>CryptoCurrencies</h1>
    <p>New CryptoCurrencies added to in the last 30 days</p>
    {/* <NewTokenList /> */}
    <TokenTable />
    <e>Created by Maxwell Ogunfunwa</e>
  </div>
);

render(<App />, document.getElementById("root"));
