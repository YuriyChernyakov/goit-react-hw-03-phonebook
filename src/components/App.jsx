import { nanoid } from "nanoid";
import { Component } from "react";
import { AddContForm } from './addContForm/addContForm';
import { ContList } from './contList/contList';
import { SearchFilter } from './searchFilter/searchFilter';
import css from './styles.module.css';

const KEY_STORAGE = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpsonttt", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" }
    ],
    filter: ""
  };

componentDidMount() {
    if (localStorage.getItem(KEY_STORAGE)) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem(KEY_STORAGE)),
      });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(KEY_STORAGE, JSON.stringify(this.state.contacts));
    }
  }

  handleInputChange = (event) => {
    this.setState({ name: event.currentTarget.value });
  };


  handleNumChange = (event) => {
    this.setState({ number: event.currentTarget.value });
  };

  addArr = () => {
    const control = this.state.contacts.find(item => {
      return this.state.name.toLowerCase().includes(item.name.toLowerCase())
    })
 console.log(control);
    if (control) {
      return alert("Warning")
    }

    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts,
        { name: this.state.name, number: this.state.number, id: nanoid(3)}
      ]
    }));
  };

  handleSearch = (e) => {
    const { value } = e.target;

    this.setState({
      filter: value.toLowerCase()
    })
  }

  deleteCont = (id) => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id)
    })
    };

  render() {
    const {
      addArr,
      handleNumChange,
      handleInputChange,
    } = this;
    const {
      contacts,
      filter,
    } = this.state;

    return (
      <div className={css.container}>
        <p className={css.text}>Phonebook</p>
        <AddContForm
          newArr={addArr}
          numChange={handleNumChange}
          inpChange={handleInputChange}
        />

        <SearchFilter
          title={'Find contacts by name'}
          searchValue={filter}
          onSearch={this.handleSearch}
        />

       <ContList
         contacts={contacts}
          filter={filter}
          delCont={this.deleteCont}
       />
      </div>
    );
  }
}

export default App;
