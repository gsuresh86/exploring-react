import { Component } from "react";

class Header extends Component {
    render(props) {
        return (
           <header className="header">
               <div>{this.props.title}</div>
               <div>{this.props.name}</div>
           </header>     
        );
    }
}

export default Header;