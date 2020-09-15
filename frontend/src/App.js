import React, { PureComponent } from 'react';
import './App.css';

import QRCode from 'qrcode.react'
import axios from "axios"

const REFRESH_INTERVAL = 30000

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      qrValue: "X"
    }
  }

  componentDidMount() {
    this.generateToken()
  }

  generateToken = () => {
    // get token from backend
    const backendUrl = "http://localhost:3080/getToken"
    axios.get(backendUrl)
      .then((res) => {
        const data = res.data

        // set QR code and repeat
        this.setState({
          qrValue: data.token
        }, () => setTimeout(this.generateToken, REFRESH_INTERVAL))
      })
  }

  render() {
    const { qrValue } = this.state
    return (
      <div className="App">
        <h1>Hello, scan this QR Code to login</h1>

          <QRCode value={qrValue} size={400} />
      </div>
    )
  }
}
export default App;
