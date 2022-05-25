import React from 'react';

export class dataForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DNI: 'Type your DNI here',
            CellPhone: 'Type your CellPhone', 
            FirstName: 'Type your First Name',
            SecondName: 'Type your Second Name',
            LastName: 'Type your Last Name',
            LastSecondName: 'Type your Last Second Name'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleButtom = this.handleButtom.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name; 

        this.setState ({
            [name] : value
        })
    }

}