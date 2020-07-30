import React, { Component } from "react";

class Test extends Component {
  state = {
    title: "",
    body: "",
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          title: data.title,
          body: data.body,
        });
        console.log(this.state);
      });
  }
  //   componentWillMount() {
  //     console.log("componentWillMount");
  //   }
  incrementA = () => {
    this.setState({ a: this.state.a + 1 });
  };
  //   componentWillUpdate() {
  //     console.log("componentWillUpdate");
  //   }
  //   componentDidUpdate() {
  //     console.log("componentDidUpdate");
  //   }
  //   componentWillReceiveProps(nextProps, nextState) {
  //     console.log("this.componentWillReceiveProps");
  //   }
  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     return null;
  //   }
  //   getSnapshotBeforeUpdate(prevProps, prevState) {
  //     console.log("getSnapshotBeforeUpdate..");
  //   }
  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
