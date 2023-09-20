import React, { Component } from "react";
import "./ToDoApp.css";

export default class ToDoApp extends Component {
  state = {
    input: "",
    items: [],
    editedText: "",
    editingIndex: null,
    isEditing: false,
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input, items, isEditing, editingIndex, editedText } = this.state;

    this.setState({
      items: [...items, input],
      input: "",
    });
    if (isEditing && editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = input;
      this.setState({
        items: updatedItems,
        input: "",
        isEditing: false,
      });
    } else {
      this.setState({
        items: [...items, input],
        input: "",
      });
    }
  };

  onedit = (key) => {
    const { items } = this.state;
    const editedText = items[key];
    this.setState({
      input: editedText,
      editingIndex: key,
      isEditing: true,
    });
  };

  handlechange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  deleteItems = (key) => {
    const allItems = this.state.items;
    allItems.splice(key, 1);
    this.setState({
      items: allItems,
    });
  };
  render() {
    const { input, items } = this.state;

    return (
      <form className="main-section" onSubmit={this.storeItems}>
        <div className="input-section">
          <h1>TO DO </h1>
          <input type="text" placeholder="Enter items" onChange={this.handlechange} value={input} minLength={2} required />
        </div>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {data}
              <div>
                <i className="fa-solid fa-edit" onClick={() => this.onedit(index)} title="Edit"></i>
                <i className="fa-solid fa-trash" onClick={() => this.deleteItems(index)} title="Delete"></i>
              </div>
            </li>
          ))}
        </ul>
      </form>
    );
  }
}
