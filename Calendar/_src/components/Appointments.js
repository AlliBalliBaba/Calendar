import React, { Component } from 'react'
import Appointment from "./Appointment";
import AddAppointment from "./AddAppointment";

const WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"]
const ENDINGS=["th","st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st","nd","rd","th"]

export class Appointments extends Component {

    sortAppointments(){
        let date = this.props.appState.currentDate.getTime();
        this.appointmentList =  this.props.appState.monthData[date] || [];
        this.appointmentList.sort(function(o1,o2){
            return Date.parse('01/01/2011 '+ o1.time) - Date.parse('01/01/2011 '+ o2.time);
          });
    }

    dayString(){
        let date=this.props.appState.currentDate;
        return WEEKDAYS[date.getDay()] + ", "+date.getDate() + ENDINGS[date.getDate()] + " of "+MONTHS[date.getMonth()];
    }

    dayDifference(){
        let now = new Date();
        let difference = this.props.appState.currentDate - new Date(now.getFullYear(),now.getMonth(),now.getDate());
        difference = Math.round(difference/1000/60/60/24);
        if(difference>0){
            return "(" + difference + " days from now)";
        }else if(difference<0){
            return "(" + (-difference) + " days ago)";
        }else{
            return "(today)";
        }
    }

    render() {
        this.sortAppointments();
        let output = this.appointmentList.map((appointment)=>{
            return(
              <Appointment 
              date = {this.props.appState.currentDate} 
              key = {appointment.id} 
              id = {appointment.id}
              time = {appointment.time} 
              info = {appointment.info} 
              delAppointment={this.props.delAppointment}
              />
            )
          });

        return (

            <div className="Appointments"> 
                <h2>{this.dayString()}</h2>
                <h3>{this.dayDifference()}</h3>

                <AddAppointment addAppointment={this.props.addAppointment} date={this.props.appState.currentDate}/>

                <table className="AppointmentsTable">
                    <tbody>
                        {output}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Appointments
