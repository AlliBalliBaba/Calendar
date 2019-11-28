import React, { Component } from 'react'

export class ChangeMonth extends Component {

// buttons to change the current month

    render() {
        return (
            <div>
                <h2> 
                    <button onClick={this.props.changeMonth.bind(this,-12)} className="aBtn hoverBtn"> 
                        <i className="arrow left"></i>
                    </button >
                    <span style={yearStyle}>{this.props.year}</span>
                    <button onClick={this.props.changeMonth.bind(this,12)} className="aBtn hoverBtn"> 
                        <i className="arrow right"></i>
                    </button >
                </h2>

                <button onClick={this.props.changeMonth.bind(this,-1)} className="aBtn hoverBtn">
                    <i className="arrow left"></i>
                </button >
                <span style={monthStyle}> {this.props.month} </span>
                
                <button onClick={this.props.changeMonth.bind(this,1)} className="aBtn hoverBtn">
                    <i className="arrow right"></i>
                </button>
                
            </div>
        )
    }
}

const monthStyle={
    fontSize:"25px",
    paddingRight:"20px",
    paddingLeft:"20px"
}

const yearStyle={
    paddingRight:"20px",
    paddingLeft:"20px"
    
}


export default ChangeMonth
