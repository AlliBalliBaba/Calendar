import React, { Component } from 'react'

export class AddAppointment extends Component {

    state={
        info:"",
        time:"12:00"
    }

    onChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event =>{
        event.preventDefault();
        if(this.state.info !== ""){
            this.props.addAppointment(this.props.date, this.state.time, this.state.info)
            this.setState({ info:"" });
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input style={fieldStyle} type="time" value={this.state.time} name="time" onChange={this.onChange}>
                    </input>
                    <input style={fieldStyle} type="text" placeholder="enter text..." value={this.state.info} name="info" onChange={this.onChange}>
                    </input>
                    <button style={btnStyle} className="hoverBtn" type="submit">ADD
                    </button>
                </form>
                
            </div>
        )
    }
}


const fieldStyle={
    margin: "5px",
    fontSize:"16px",
    paddingRight: "5px",
    paddingLeft: "5px",
    backgroundColor: "white",
    borderRadius: "5px",
    height:"30px"
}

const btnStyle={
    margin: "5px",
    fontSize:"16px",
    cursor:"pointer",
    paddingTop:"4px",
    borderRadius:"7px",
    backgroundColor:"white",
    height:"39px"
}

export default AddAppointment
