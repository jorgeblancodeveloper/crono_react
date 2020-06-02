import React from "react";

 const Button = ({full,name, onClick})=> {
    const className = [
        "component-button",
      ];
return  (
        <div className={className.join(" ").trim() + (full ? ' full' : '')}
        onClick={onClick}>
          {name}
        </div>
      );
  }

export { Button};
  const Time = ({value})=> {
  const secondsToMinutes = Math.floor(value / 60) + ':' + ('0' + Math.floor(value % 60)).slice(-2);
  return  (
        <span className="number">
         {secondsToMinutes}
        </span>
      );
  }
export {Time};


class  Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name:"dummy",
            outsideResolve: undefined,
          };
      }
     
      resolveAfter2Seconds = function () {

        const promesa = new Promise(resolve => {
          this.setState({outsideResolve : resolve}); 
          setTimeout(() => {
          //  resolve(this.state.name);
          }, 20000);
        });
        setTimeout(() => {
        //  this.state.outsideResolve(this.state.name);
           
          }, 2000);
        return promesa
      }
/*
      show = async () => {
          console.log("he llegado aqu");
          this.state = {
            show: true
          };
          var     name = 'Piil'
          var promise = new Promise( (resolve, reject) => {
            console.log("monto")
              if (name === 'Paul') {
                console.log("acc");
                setTimeout(()=>{ resolve("Promise resolved successfully"); }, 3000);
              
              }
              else {
                console.log("can")
               reject(Error("Promise rejected"));
              }
             });


             let obj = {newName: ''};
             promise.then( result => {
              this.setState({show: false});
             }, function(error) {

             });

      };
      */
     handleChange(event) {
        this.setState({name: event.target.value})
      }
  render(){
    const showme=   this.props.showme && (
   //   const showme= this.state.show &&  (
        <div className="modal">
        <div>
    {this.props.children}
    <div className="row">
    <input type="text" id="name" name="name"   onChange={this.handleChange.bind(this)} defaultValue={this.state.name}/>
    <Button 
        name="Aceptar"
        onClick={() => this.props.accept(true)}
        />
    </div>
    <Button 
        value={1}
        name="Cancelar"
        onClick={() => this.state.outsideResolve(this.state.name)}
        />
    </div>
</div>)
      
  return  showme;
  }
  }
  export {Modal};