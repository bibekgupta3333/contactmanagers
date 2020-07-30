import React, { Component } from "react";
import { Consumer } from "../../context.js";
import TextInputGroup from "../layout/TextInputGroup";
// import { v4 as uuid } from "uuid";
import axios from "axios";
class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {},
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    // check for error
    if (name === "") {
      this.setState({ error: { name: "Name is Required" } });
      return;
    } else if (email === "") {
      this.setState({ error: { email: "Email is Required" } });
      return;
    } else if (phone === "") {
      this.setState({ error: { phone: "Phone is Required" } });
      return;
    }
    const newContact = {
      name,
      email,
      phone,
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      error: {},
    });
    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, error } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Enter Name.."
                    onChange={this.onChange}
                    error={error.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Enter Email..."
                    onChange={this.onChange}
                    error={error.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter Phone..."
                    onChange={this.onChange}
                    error={error.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
