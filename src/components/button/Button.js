import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
    render(){
        return (
            <div id={this.props.color}  className="button" onClick={()=>{this.props.click(this.props.color)}} style={{background:`${this.props.color}`}}>
            </div>
        )
    }
}

export default Button