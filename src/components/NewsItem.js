import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl,newsUrl} = this.props;
    return (
      <div>
        <div className="card">
            <img src={imageUrl ? imageUrl : ''} className="card-img-top" alt="  " />
            <div className="card-body">
                <h5 className="card-title">{title.length === 45 ? title+"..." : title}</h5>
                <p className="card-text">{description.length === 88 ? description+"..." : description}</p>
                <a href={newsUrl} className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem