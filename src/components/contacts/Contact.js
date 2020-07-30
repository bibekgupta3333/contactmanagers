import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { Consumer } from "../../context";
class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  onDeleteClick = async (id, dispatch) => {
    // axios
    //   .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    //   .then((res) => dispatch({ type: "DELETE_CONTACT", payload: id }));
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };
  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times float-right text-danger "
                  style={{ cursor: "pointer" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />

                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fa fa-pencil-alt text-dark  float-right mr-3"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.defaultProps = {
  name: "Name Missing",
  email: "Email Missing",
  phone: "Phone Missing",
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
