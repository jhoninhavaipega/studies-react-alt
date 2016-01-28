import React, { Component } from 'react';
import { Header } from './header.js';
import { Content } from './content.js';
import { Footer } from './footer.js';

export class Dropdown extends Component {
  renderHeader() {
    return (
      <Header />
    )
  }

  renderContent() {
    return (
      <Content content={ this.props.content } />
    )
  }

  renderFooter() {
    return (
      <Footer />
    )
  }

  render() {
    return (
      <div className="dropdown">
        { this.renderHeader() }
        { this.renderContent() }
        { this.renderFooter() }
      </div>
    )
  }
}