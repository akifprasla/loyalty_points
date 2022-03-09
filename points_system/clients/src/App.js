import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Content from './components/MainPage';
import { useState } from 'react'
import Axios from 'axios'
import logo from './images/logo.jpg'


function App() {

  var [state, show] = useState()
  const [custNumber, setCustNumber] = useState('')
  const [custName, setCustName] = useState('')
  const [custPurchase, setCustPurchase] = useState('')
  const [searchNum, setSearchNum] = useState('')
  const [custData, setCustData] = useState([])

  

  //Axios request to insert new cust data into database           (C)rud
  const submit = () => {

    Axios.post(`http://localhost:3001/api/insert/`,
      {
        custNumber: custNumber,
        custName: custName,
        custPurchase: custPurchase
      })
  }


  //Axios request to search for an existing customer              c(R)ud
  const search = () => {

    Axios.get(`http://localhost:3001/api/get/${searchNum}`)
      .then((response) => {
        setCustData(response.data)
        show(state = "show")
      })
  }


  //Axios request to add points to existing customer              cr(U)d
  const addPoints = () => {

    search()
    const points = custData[0].cust_points
    Axios.put(`http://localhost:3001/api/update/${custPurchase}/${points}/${searchNum}`, (err, result) => { console.log(result); })

  }

  //Axios request to delete a customer                            cru(D)
  const remove = () => {
    Axios.delete(`http://localhost:3001/api/delete/${searchNum}`)
      .then(() => {
        alert("Successfully removed")
        show(state="")
      })
  }

  const redeemPoints = () => {
    search()
    const points = custData[0].cust_points
    Axios.put(`http://localhost:3001/api/redeem/${custPurchase}/${points}/${searchNum}`, (err, result) => { console.log(result); })
  }


  return (
    <div className="App">
      <nav className="navbar navbar-light bg-dark navContainer">
        <div className="container-fluid ">
          <a className="navbar-brand" href="/">
            <img src={logo} id="logo" alt="" />
          </a>
          <span style={{ color: "white", height: "35px", fontWeight: "bold", width: "150px" }}>Loyalty Program</span>
        </div>
      </nav>

      <div className="content" align="left">
        <h2>Add a new customer</h2>
        <input id="cust_num" type="text" onChange={(e) => { setCustNumber(e.target.value) }} placeholder="Customer number" />
        <input id="cust_name" type="text" onChange={(e) => { setCustName(e.target.value) }} placeholder="Customer name" />
        <input id="cust_purchase" type="text" onChange={(e) => { setCustPurchase(e.target.value) }} placeholder="Price" />
        <button className="searchBtn" onClick={submit} >Add</button>
      </div>
      <br />
      <div className="content" align="left">
        <h2>Search for a customer</h2>
        <input id="cust_num" type="text" onChange={(e) => { setSearchNum(e.target.value) }} placeholder="Customer number" />
        <button className="searchBtn" onClick={search} >Search</button>
        <button className="searchBtn" onClick={remove} >Delete</button>
        <br />
        <br />
        {state === "show" && <Content data={custData} />}
      </div>
      <br />
      <div className="content" align="left">
        <h3>Add points to the above customer</h3>
        <input id="cust_purchase" type="text" onChange={(e) => { setCustPurchase(e.target.value) }} placeholder="Price" />
        <button className="searchBtn" onClick={addPoints} >Add</button>
        <button className="searchBtn" onClick={redeemPoints} >Redeem</button>
      </div>

    </div>
  );
}

export default App;
