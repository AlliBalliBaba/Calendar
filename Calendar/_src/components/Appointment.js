import React, { Component } from 'react'


export class Appointment extends Component {

    render() {
        return (
            <tr className="Appointment animate animate-reveal-left">
                <td className="Time">{this.props.time}</td>
                <td className="Info">{this.props.info}</td>
                <td className="DelButton"><button 
                    className="Redbtn"
                    onClick={this.props.delAppointment.bind(this, this.props.id)}>
                    X
                </button></td>
            </tr>
        )
    }
}

export default Appointment
