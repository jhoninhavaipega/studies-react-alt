import React, { Component } from 'react';

export class Content extends Component {
  render() {
    return (
      <section className="dropdown-content">
        { this.props.content }
      </section>
    )
  }
}