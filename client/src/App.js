import React from 'react';
import './App.scss';

const DisplayOutput = (props) => {
  return (
    <div id="output">
      <div id="input">{props.input}</div>
      <div id="display">{props.result}</div>
    </div>
  )
}

const ButtonNums = (props) => {
  return(
    <div id="buttons">
        <div id="clear"    onClick={props.cal}   >AC</div>
        <div id="divide"   onClick={props.input} >/</div>
        <div id="multiply" onClick={props.input} >x</div>
        <div id="seven"    onClick={props.input} >7</div>
        <div id="eight"    onClick={props.input} >8</div>
        <div id="nine"     onClick={props.input} >9</div>
        <div id="subtract" onClick={props.input} >-</div>
        <div id="four"     onClick={props.input} >4</div>
        <div id="five"     onClick={props.input} >5</div>
        <div id="six"      onClick={props.input} >6</div>
        <div id="add"      onClick={props.input} >+</div>
        <div id="one"      onClick={props.input} >1</div>
        <div id="two"      onClick={props.input} >2</div>
        <div id="three"    onClick={props.input} >3</div>
        <div id="zero"     onClick={props.input} >0</div>
        <div id="decimal"  onClick={props.input} >.</div>
        <div id="equals"   onClick={props.cal}   >=</div>
      </div>
  )
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      total: '0',
      evaluated: false
    }
    this.getValue = this.getValue.bind(this);
    this.specialChar = this.specialChar.bind(this);
  }
  getValue(e) {
    let inputVal = this.state.input.replace(/^[0|\+|x|\/|\-]+$/,'');
    let totalVal = this.state.total.replace(/^[0|\+|x|\/|\-]+$/,'');
    let currentVal = (!totalVal && !/0$/.test(inputVal)) || this.state.evaluated || /[\+|x|\/|\-]$/.test(inputVal) ?
        e.target.innerText.replace(/[\.]/,'0.'):
        e.target.innerText;

    if(totalVal.length > 10 || inputVal.length > 20){
      this.setState({ total: currentVal, input: 'DIGIT LIMIT MET' })
      setTimeout(() => { this.setState({ total:currentVal, input:currentVal}) }, 2000);
      return;
    }
    if ( !(totalVal.includes(currentVal) && currentVal === '.')) {
      if(this.state.evaluated) {
        if('+-/x'.includes(currentVal)){
          this.setState({
            total: currentVal,
            input: totalVal + currentVal,
            evaluated: false
          })
        } else {
          this.setState({
            total: currentVal,
            input: currentVal,
            evaluated: false
          })
        }
     } else {
        if('+-/x'.includes(currentVal)){
          if(/[+\-\/x]$/.test(inputVal)) {
             inputVal = inputVal.slice(0, -1);
          }
          this.setState({
            input: inputVal + currentVal,
            total: currentVal,
            evaluated: false
          })
        } else {
          this.setState({
            input: inputVal + currentVal,
            total: totalVal.replace(/[x\/\-\+]/g,'') + currentVal,
            evaluated: false
          })
        }
      }
    }
  }
  specialChar(e) {
    let char = e.target.innerText;
    let input = this.state.input.replace(/x/g,'*');
    if (char === '=') {
      if(!input || input=='0' || /=/g.test(input)) return;
      let strNum = ''+eval(input);
      let evaluate = `${eval(input)}`.length > 9?
          eval(input).toPrecision(9):
          eval(input);
      
      this.setState({
        input: this.state.input +' = '+evaluate,
        total: evaluate+'',
        evaluated: true
      })
    } else if (char === 'AC') {
      this.setState({
        total: '0',
        input: ''
      })
    }
  }
  render () {        
    return (
      <div id="calculator">
        <DisplayOutput result={this.state.total} input={this.state.input}/>
        <ButtonNums input={this.getValue} cal={this.specialChar}/>
      </div>
    )
  }
}


export default App;
