import React, { Component } from 'react'

export class Day extends Component {
    
    constructor(props){
        super(props);
        this.isToday = (props.today.setHours(0,0,0,0) === props.date.getTime());
    }

    selectDate(){
        this.props.setDate(this.props.date);
    }
    
    render() {
        this.isCurrent = (this.props.date.getTime() === this.props.selectedDate.getTime());

        let hasAppointments = () => {
            return this.props.appNum > 0 ? "Sphere" : "NoSphere";
        }

        return (
            <div className="Day">
                <button style={this.isCurrent ? btnSelected : (this.isToday? btnToday : btnStyle)} className="btn" onClick={this.selectDate.bind(this)}>
                    {this.props.daynum}

                    <div className={hasAppointments()}> 
                        <div>{this.props.appNum}</div>
                    </div>

                </button>
                
            </div>
        )
    }
}


const btnStyle ={
    outline:"none"
}


const btnToday ={
    borderColor: "grey",
    borderStyle:"dotted",
}

const btnSelected ={
    color:"white",
    backgroundColor: "blue",
    borderRadius:"5px",
    outline:"none"
}


export default Day
