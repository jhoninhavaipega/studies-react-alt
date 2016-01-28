import React, { Component } from 'react';

export class Notification extends Component {
  render() {
    return (
      <li className="notification notification--unread">
        <figure className="notification-figure">
          <a href={ this.props.data.path_product } title={ this.props.data.title }>
            <img src={ this.props.data.path_image } alt={ this.props.data.title } />
          </a>
        </figure>

        <div className="notification-text">
          <h3 className="notification-title">
            <a href={ this.props.data.path_product } title={ this.props.data.title }>
              { this.props.data.title }
            </a>
          </h3>
          <p className="notification-type">
            <a href={ this.props.data.path_product } title={ this.props.data.title }>
              <i className={ this.props.data.type }></i>
              { this.props.data.type }
              <time>{ this.props.data.created_at }</time>
            </a>
          </p>
        </div>
      </li>
    )
  }
}