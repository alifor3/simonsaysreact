import React, { Component } from 'react';
import './App.css';

import Button from './components/button/Button'
import {generateColor} from './helper';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      colors:['red', 'yellow', 'green', 'blue'],
      turns:[],
      userTurn: 0,
      canClick: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount(){
    this.start();
  }

  start(){
    const color = generateColor(this.state.colors);
    this.setState({
      turns:[...this.state.turns, color]
    }, ()=>{this.changeColor(0)})  
  }

  changeColor(i){
    let to = this.state.turns.length -1;
    const time1 = (cb)=>{
      const colors = this.state.colors.map((e)=>{
        return e === this.state.turns[i] ? "white" : e;
      })
      this.setState({
        colors
      })
      setTimeout(cb, 1000)
    }

    const time1Bound = time1.bind(this)
    

    const time2 = (colorNext)=>{
      const colors = this.state.colors.map((e)=>{
        return e === "white" ? this.state.turns[i] : e;
      })
      this.setState({
        colors
      })
      if(colorNext){
        setTimeout(()=>{
          this.changeColor(i + 1)
        }, 500)
      }else{
        this.setState({
          canClick: true
        })
      }
    }

    const time2Bound = time2.bind(this)
    if(i === to){
      setTimeout(time1Bound(time2Bound), 1000)
    }else{
      setTimeout(time1Bound(()=>{time2Bound(this.state.turns[i + 1])}), 1000)
    }
    
  }


  handleClick(color){
    if(this.state.canClick){
      if(color === this.state.turns[this.state.userTurn]){
        if(this.state.turns.length -1 === this.state.userTurn){
          const newColor = generateColor(this.state.colors)
          this.setState({
            turns:[...this.state.turns, newColor],
            userTurn: 0,
            canClick: false
          }, ()=>{this.changeColor(0)})
          
        }else{
          this.setState({
            userTurn: this.state.userTurn + 1
          })
        }
      }else{
        alert("You done messed up AAron!!!")
        this.setState({
          colors:['red', 'yellow', 'green', 'blue'],
          turns:[],
          userTurn:0,
          canClick: false,
        }, this.start)
      }
    }
  }

  render() {
    const buttons = this.state.colors.map((e, i)=>{
      return  <Button key={i} ref={this[e]} click={this.handleClick} color={e}/>
    })

    return (
      <div className="App">
        <h1>Simon Says</h1>
        <div className="button-container">
          {buttons}
        </div>
      </div>
    );
  }
}

export default App;
