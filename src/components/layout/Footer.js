import React, { Component } from "react";

class Footer extends Component {
  render() {
    const { footerContent } = this.props;
    return (
      <div>
        <footer className="bg-danger py-3 text-center">{footerContent}</footer>
      </div>
    );
  }
}

export default Footer;
