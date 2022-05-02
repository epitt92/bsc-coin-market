import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
//import axois for http request
import Axios from "axios";
import moment from "moment";
import { Line } from "@ant-design/plots";

import { Table, Tag, Space, Button, Image } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const styles = {
  textAlign: "",
  marginBottom: "20px",
};

// const config = {
//   data,
//   padding: 'auto',
//   xField: 'Date',
//   yField: 'scales',
//   xAxis: {
//     // type: 'timeCat',
//     tickCount: 5,
//   },
// };

const columns = [
  {
    title: "#",
    dataIndex: "image",
    key: "image",
    render: (url) => <Image src={url} width={25} preview={false} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => <a>{name}</a>,
  },
  {
    title: "Price",
    dataIndex: "current_price",
    key: "current_price",
    render: (current_price) => (
      <span>$
        {
          current_price > 1 ? current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : current_price
        }
      </span>
    ),
    sorter: (a, b) => a.current_price - b.current_price,
  },
  {
    title: "1h",
    dataIndex: "price_change_percentage_1h_in_currency",
    key: "price_change_percentage_1h_in_currency",
    render: (percentage) => (
      <div>
        {percentage >= 0 ? (
          <span style={{ color: "green" }}>
            <CaretUpOutlined />
            {percentage.toPrecision(3)}%
          </span>
        ) : (
          <span style={{ color: "red" }}>
            <CaretDownOutlined />
            {Math.abs(percentage.toPrecision(3))}%
          </span>
        )}
      </div>
    ),
    sorter: (a, b) =>
      a.price_change_percentage_1h_in_currency -
      b.price_change_percentage_1h_in_currency,
  },
  {
    title: "24h",
    dataIndex: "price_change_percentage_24h_in_currency",
    key: "price_change_percentage_24h_in_currency",
    render: (percentage) => (
      <div>
        {percentage >= 0 ? (
          <span style={{ color: "green" }}>
            <CaretUpOutlined />
            {percentage.toPrecision(3)}%
          </span>
        ) : (
          <span style={{ color: "red" }}>
            <CaretDownOutlined />
            {Math.abs(percentage.toPrecision(3))}%
          </span>
        )}
      </div>
    ),
    sorter: (a, b) =>
      a.price_change_percentage_24h_in_currency -
      b.price_change_percentage_24h_in_currency,
  },
  {
    title: "Fully Diluted Macket Cap",
    dataIndex: "fully_diluted_valuation",
    key: "fully_diluted_valuation",
    render: (fully_diluted_valuation) => (
      <div>
        {fully_diluted_valuation ? (
          <span>
            $
            {fully_diluted_valuation
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        ) : (
          <span>--</span>
        )}
      </div>
    ),
    sorter: (a, b) => a.fully_diluted_valuation - b.fully_diluted_valuation,
  },
  {
    title: "Volume",
    dataIndex: "total_volume",
    key: "total_volume",
    render: (total_volume) => (
      <span>
        ${total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>
    ),
    sorter: (a, b) => a.total_volume - b.total_volume,
  },
  {
    title: "Added",
    dataIndex: "last_updated",
    key: "last_updated",
    render: (datetime) => <span>{moment(datetime).fromNow()}</span>,
  },
  {
    title: "Last 7 days",
    dataIndex: "sparkline_in_7d",
    key: "sparkline_in_7d",
    render: function (sparkline) {
      let data = sparkline.price;
      let formatedData = [];
      // console.log(data)
      for (let i = 0; i < data.length; i++) {
        formatedData.push({ price: data[i], date: i });
      }
      return (
        <Line
          data={formatedData}
          yField={"price"}
          xField={"date"}
          width={100}
          height={100}
          legend={false}
          label={false}
          color={"red"}
        />
      );
    },
  },
];

class TokenTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  //getting data from the api, something a servert would do.
  getData = (flag) => {
    Axios.post("http://localhost:3001/getTokens", { flag: flag })
      .then((res, err) => {
        if (res.status === 200) {
          // let bnbs = res.data.data
          console.log(res.data);

          this.setState({ data: res.data });
        } else {
          console.log("Houston we have a problem: " + err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount = () => {
    this.getData(0);
  };

  //using data from the api with react table to disply.
  render() {
    const { data } = this.state;
    return (
      <div>
        <div style={styles}>
          <button onClick={() => this.getData(2)}>All Coin Added</button>&nbsp;
          <button onClick={() => this.getData(0)}>New Coin Added</button>&nbsp;
          <button onClick={() => this.getData(1)}>Best Gainers</button>
        </div>
        {/* <Button>Hello</Button>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "#",
              accessor: "id"
            },
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Price",
              accessor: "quote.USD.price"
            },
            {
              Header: "1h",
              accessor: "quote.USD.percent_change_1h"
            },
            {
              Header: "24h",
              accessor: "quote.USD.percent_change_24h"
            },
            {
              Header: "Fully Diluted Macket Cap",
              accessor: "quote.USD.fully_diluted_market_cap"
            },
            {
              Header: "Volume",
              accessor: "quote.USD.volume_24h"
            },
            {
              Header: "Blockchain",
              accessor: "symbol"
            },
            {
              Header: "Added",
              accessor: "date_added"
            },
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        /> */}

        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default TokenTable;
