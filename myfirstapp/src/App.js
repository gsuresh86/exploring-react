
import './App.css';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import Person from "./components/person";
import Header from "./components/header";
import CreatePerson from "./components/new-person";
import { Button, Input, Drawer, Skeleton } from "antd";

const { Search } = Input;

class App extends Component {

  constructor(props){
    super(props)
    this.child = React.createRef();
  }

  state = {
    persons: [
    
    ],
    isLoaded: false,
    searchText: "",
    title: "Persona ßeta",
    username: "Suresh",
    showDrawer: false,
    selectedPerson: null
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=20")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          persons: json.results.map(({name, email, picture}) => {
            return {
              name: `${name.first} ${name.last}`,
              email: email,
              picture: picture.large
            };
          })
        })
      });
  }

  onClickHandler = ()=> {
    this.setState({
      showDrawer: true
    })
  }

  onSearch = value => {
    this.setState({searchText: value.target.value.toLowerCase()});
  }

  deletePerson = index => {
    const persons = [...this.state.persons]
    persons.splice(index, 1);
    this.setState({persons})
  }

  showDrawer = () => {
    this.setState({
      showDrawer: true,
    });
  };

  onClose = () => {
    this.setState({
      showDrawer: false,
    });
  };

  editPerson = (index) => {
    const persons = [...this.state.persons]
    const selectedPerson = persons.splice(index, 1);
    this.setState({selectedPerson, showDrawer: true});
  }

  
  addPerson = () => {
    if(!this.child.current.valid) {
      return;
    }
    const newPerson = this.child.current.person;
    this.setState(state => {
      const persons = [...state.persons, newPerson]
      return {
        persons,
        showDrawer: false
      };
    });
  }

  render() {

    const persons = this.state.persons
      .filter(item => item.name.toLocaleLowerCase()
      .includes(this.state.searchText));


    let pList = persons.map( (person, index) => {
        return <Person key={"card"+index} picture={person.picture} name={person.name} email={person.email} 
        deleteClick={()=>this.deletePerson(index)}
        editClick={()=>this.editPerson(index)}
        ></Person>
    })

    return (
      <div className="App">
        <Header title={this.state.title} name={this.state.username}/>
        
        <div className="card-container">
          <div className="card-action">
            <div className="card-search">
              <Search placeholder="input search text" onChange={this.onSearch} onSearch={this.onSearch} style={{ width: 300 }} />
            </div> 
            <Button onClick={this.onClickHandler} type="primary">Add Person</Button>
          </div>
          <Skeleton active paragraph={{ rows: 20 }} loading={!this.state.isLoaded}>
          <div className="card-list">
            {pList}
          </div>
          </Skeleton>
        </div>
      
        <Drawer
            title="Create a new person"
            width={720}
            onClose={this.onClose}
            visible={this.state.showDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.addPerson} type="primary">
                  Add
                </Button>
              </div>
            }
        >
          <CreatePerson ref={this.child} person={this.state.selectedPerson}></CreatePerson>
        </Drawer> 
      </div>

    );
  }
}

export default App;