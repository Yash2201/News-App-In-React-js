import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl,newsUrl, author, date,source} = this.props;
    return (
      <div>
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{'zIndex':'1', 'left':'90%'}}>
              {source}
            </span>
            <img src={imageUrl ? imageUrl : ''} className="card-img-top" alt="  " />
            <div className="card-body">
                <h5 className="card-title">{title.length === 45 ? title+"..." : title}</h5>
                <p className="card-text">{description.length === 88 ? description+"..." : description}</p>
                <a href={newsUrl} className="btn btn-dark">Read More</a>
                <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toDateString()}</small></p>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem