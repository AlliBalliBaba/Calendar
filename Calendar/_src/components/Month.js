import React, {Component} from 'react';
import Day from "./Day";
import ChangeMonth from "./ChangeMonth";

class Month extends Component {

  constructor(props){
    super(props);
    this.state={
      date:"",
      today:"",
      direction:false
    };
    this.state.date= new Date();
    this.state.today= new Date();
  }

  weekDays= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  changeMonth = (change) => {
    let newDate= new Date(this.year(), this.month() + change , 1);
    this.setState( {
      date: newDate, 
      direction:change > 0 ? true : false
    }, this.props.getServerData(newDate,"POST") );
  }

  year = () => {
    return this.state.date.getFullYear(); 
  }
  month = () => {
    return this.state.date.getMonth(); 
  }
  day = (daynum) => {
    return new Date(this.year(), this.month(), daynum); 
  }

  daysInMonth = () => {
    let curDate= new Date(this.year(), this.month()+1, 0);
    return curDate.getDate();
  }

  firstDayOfMonth(){
    let curDate= new Date(this.state.date);
    curDate.setDate(1);
    return curDate.getDay(); 
  }

  emptyDays(){
    let empty=[];
    for(let i=0; i < this.firstDayOfMonth();i++){
      empty.push(<td key={i} className="emptyDay">{" "}</td>);
    }
    return empty;
  }

  occupiedDays(){
    let occupied = [];
    for(let i=1; i <= this.daysInMonth(); i++){
      let thisDay= this.day(i);
      occupied.push(
      <td key={thisDay.getTime()} className="day">
        <Day 
        date = {thisDay} 
        daynum={i} 
        today = {this.state.today} 
        setDate={this.props.setDate} 
        appNum={this.numberOfAppointments(thisDay)}
        selectedDate = {this.props.appState.currentDate}
        />
      </td>);
    }
    return occupied;
  }

  numberOfAppointments(day){
    let dateNumber= day.getTime();
    if(this.props.appState.monthData[dateNumber]){
      return this.props.appState.monthData[dateNumber].length;
    }
    return 0;
  }

  createRows(){
    let alldays= [...this.emptyDays(),...this.occupiedDays()];
    let rows=[];
    let n = -1;
    for(let i=0; i<alldays.length;i++){
      if (i % 7 === 0){
        rows.push([]);
        n++;
      } 
      rows[n].push(alldays[i]);
    }
    return rows;
  }

  render(){
    let weekdayRow = this.weekDays.map((day)=>{
      return(
        <td className="weekday" key={day}> {day}  </td>
      )
    });
    let dayRows = this.createRows().map((row,i) => {
      return(
        <tr key={i*1000+1000}>{row}</tr>
      );
      
    });

    return (
      <div className={"Calendar"}>
        <ChangeMonth 
          date = {this.state.date} 
          month = {this.months[this.month()]} 
          year = {this.year()}
          changeMonth= {this.changeMonth}
        />
        <br/>
        <table 
        className={"CalendarTable animate " + (this.state.direction?"animate-reveal-left":"animate-reveal-right")}
        key={this.day(1).getTime()}
        >
          <thead></thead>
          <tbody>
            <tr>{weekdayRow}</tr>
            {dayRows}
          </tbody>
        </table>
      </div>
  );
}


}

export default Month;