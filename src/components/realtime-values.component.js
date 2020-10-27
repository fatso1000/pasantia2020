import React, { Component } from 'react';
import axios from 'axios';

// FUNCTIONAL REACT COMPONENT
const Values = props => (
    <tr>
        <td>{props.values.temperatura}</td>
        <td>{props.values.humedad}</td>
        <td>{props.values.tilt}</td>
        <td>{props.values.createdAt.substring(0, 10)}</td>
    </tr>
)

export default class RealtimeValues extends Component {
    constructor(props) {
        super(props);

        this.state = { values: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/values/')
            .then(response => {
                this.setState({ values: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    valuesList() {
        return this.state.values.map((currentvalues, index) => {
            if (index === 0) {
                return <Values values={currentvalues} />
            }
            return console.log('unnecessary values');
        });
    }

    render() {
        return(
            <div>
                <h3>Valores en tiempo real</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Temperatura</th>
                            <th>Humedad</th>
                            <th>Tilt</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.valuesList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
