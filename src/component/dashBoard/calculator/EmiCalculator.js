import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EmiCalculator extends Component {
    constructor() {
        super();
       this.state = {
          emi:0,
          interest:0,
          total:0,
          amount:0,
          rate:0,
          tenure:0
        };
    }

    changeValue = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      }

    calculate = () =>{
        var p = this.state.amount;
        var t = this.state.tenure;
        var r = this.state.rate;
        var monthlyEmi = (p*t*r)/100;
        this.setState({
            emi: monthlyEmi

        })
    }

    render(){
    return (
        <div className="emi-class">
            <div>
            <TextField  required  id="name" label="Loan Amount"  className = "amount"   margin="normal"  onChange={this.changeValue('amount')} />
            </div>
            <div>
            <TextField  required  id="number" label="Interest Rate"  className = "rate"   margin="normal"   type="number" onChange={this.changeValue('rate')} />
            </div>
            <div>
            <TextField  required  id="amount" label="Tenure"  className = "tenure"   margin="normal"  onChange={this.changeValue('tenure')} />
            </div>
            <div>
            <Button variant="contained" color="primary" className="calculate-class" onClick ={this.calculate}> Calculate </Button>
            </div>
            <div>
                Loan EMI ={this.state.emi}
            </div>
           
        </div>
    )}
}

export default EmiCalculator
