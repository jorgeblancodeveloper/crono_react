import React from "react";
import { Button } from "./components";

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: "Sesión",
            outsideResolve: undefined,
        };
    }

    sendSessionName = function () {
        const promesa = new Promise(resolve => {
            this.setState({ outsideResolve: resolve });
        });
        return promesa
    }

    _handleChange(event) {
        this.setState({ name: event.target.value })
    }
    render() {
        const showme = this.props.showme && (
            <div className="modal">
                <div>
                    {this.props.children}
                    <div className="row">
                        <input type="text" id="name" name="name" onChange={this._handleChange.bind(this)} defaultValue={this.state.name} />
                        <Button onClick={() => this.state.outsideResolve(this.state.name)}>Aceptar</Button>
              
                    </div>
                    <Button onClick={() => this.props.accept(false)}> Cancelar </Button>
              
                </div>
            </div>)
            
        return showme;
    }
}
export { Modal };