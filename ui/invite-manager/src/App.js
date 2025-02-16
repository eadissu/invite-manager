import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      rspvs:[]
    }
  }

  API_URL="http://localhost:5038/";

  componentDidMount(){
    this.refreshRSVPS();
  }

  // Method to get invites from api
  async refreshRSVPS() {
    fetch(this.API_URL + "api/getRSVPS")
      .then(response => response.json())
      .then(data => {
        this.setState({ rsvps: data });
      })
      .catch(error => console.error("Error fetching RSVPs:", error));
  }

  // Method to add RSVPS
  async addClick(){
    var newRSVP=document.getElementById("newRSVP").value;
    const data = new FormData();
    data.append("newRSVP", newRSVP);

    console.log("Add RSVPS: " + this.API_URL + "api/addRSVPS");

    fetch(this.API_URL + "api/addRSVPS", {
      method: "POST",
      body:data
    }).then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshRSVPS();
    })
  }

  // Method to delete RSVPS
  async deleteClick(id){
    fetch(this.API_URL + "api/deleteRSVPS?id=" + id, {
      method : "DELETE",
    }).then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshRSVPS();
    })
  }

  render() {
    const{rsvps} = this.state;
    return (
      <div className="App">
        <h2>Event Manager</h2>

        <input id="newRSVP"/> &nbsp;
        <button onClick={()=>this.addClick()}> Add RSVP </button>

        {rsvps && rsvps.length > 0 ? rsvps.map(rsvp => (
          <p key={rsvp.id}>
            {rsvp.id} &nbsp;
            <button onClick={() => this.deleteClick(rsvp.id)}> Remove RSVP </button>
          </p>
        )) : <p>No RSVPs yet.</p>}

      </div>
    )
  }
}

export default App;
