import React, {Component} from 'react';
import './styles/Buttons.css';
import './styles/Loading.css';
import './styles/Table.css';
import './styles/Animations.css';
import './styles/App.css';
import Month from "./components/Month";
import Appointments from "./components/Appointments";

const SERVERNAME="http://localhost:8000/";

class App extends Component {

  constructor(props){
    super(props);
    let today= new Date();
    this.requests = [];
    this.state={monthData: {}, loading: true};
    this.state.currentDate = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    this.getServerData(this.state.currentDate, "POST");
  }

getServerData(date, method, body = {}){
  !this.state.loading && this.setState({loading:true});
  let mintime = this.convertToSQLDate(new Date(date.getFullYear(),date.getMonth(), 1));
  let maxtime = this.convertToSQLDate(new Date(date.getFullYear(),date.getMonth() + 1, 1));
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    if(xhr === this.requests[0]){
      this.requests=[];
      this.setState({
        currentDate: date, 
        loading: false, 
        monthData: this.convertServerData(xhr.responseText)});}
  });
  xhr.open(method, SERVERNAME+'appointments.php');
  body["mintime"] = mintime;
  body["maxtime"] = maxtime;
  this.requests.unshift(xhr);
  xhr.send(JSON.stringify(body));
}

convertServerData(data){
  let convertedData={};
  JSON.parse(data).forEach((element)=>{
    let date = this.convertToJsDate(element.time);
    let day = new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime();
    let time = date.toLocaleTimeString().substring(0, 5);
    if(!convertedData[day]){
      convertedData[day] = [];
    }
    convertedData[day].push({
      "id":element.id,
      "time":time,
      "info":element.content
    })
  })
  return convertedData;
}

convertToJsDate(mySQLDate){
  let dateParts= mySQLDate.split(/[- :]/);
  dateParts[1]--;
  let utcDate = new Date(...dateParts);
  return new Date(utcDate.getTime() - 60000 * new Date().getTimezoneOffset());
}

convertToSQLDate(jsDate){
  return jsDate.toISOString().slice(0, 19).replace('T', ' ');
}

addAppointment = (date, time, info)=>{
  date = this.convertToSQLDate(new Date(date.getFullYear(),date.getMonth(),date.getDate(), time.substring(0,2), time.substring(3,5)));
  let body={
    "content":info,
    "time":date
  }
  this.getServerData(this.state.currentDate, "POST", body)
}

deleteAppointment(id){
  let body={
    "appId":id,
  }
  this.getServerData(this.state.currentDate, "POST", body)
}

setDate = (date)=>{
  this.setState({
        "currentDate":date
  });
}

  render(){
    return (
      <div className="App">
        <h1> {this.state.loading?<div id="placeholder"></div>:""} 
          My Calendar 
          {this.state.loading?<div id="lds-dual-ring"></div>:""}
        </h1>
        
        <div className="Display">
          <Month 
          appState={this.state} 
          setDate={this.setDate}
          getServerData={this.getServerData.bind(this)}/>
          <Appointments 
          appState={this.state} 
          setDate={this.setDate} 
          addAppointment={this.addAppointment.bind(this)} 
          delAppointment={this.deleteAppointment.bind(this)}/>
        </div>
         
      </div>
    );
  }
}

export default App;
