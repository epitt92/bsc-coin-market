import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
//import axois for http request
import Axios from "axios";

const styles = {
  textAlign: "",
  marginBottom: "20px"
};

class NewTokenList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  //getting data from the api, something a servert would do.
  getData = () => {
    Axios.get("http://localhost:3001/getNewTokens")
      .then((res, err) => {
          if (res.status === 200) {
            this.setState({ data: res.data.data });
          } else {
            console.log("Houston we have a problem: " + err);
          }
        }
      ).catch(err => {
        console.log(err)
      });
  };

  componentWillMount = () => {
    this.getData();
  };
  //using data from the api with react table to disply.
  render() {
    const { data } = this.state;
    return (
      <div>
        {
          data.length > 0 ? data.filter((token, index) => token.slug.includes("bnb") || token.slug.includes("binance")).map((token, index) => <li>{ index+1 }. { token.name }</li>) : ''
        }
      </div>
    );
  }
}

export default NewTokenList;
