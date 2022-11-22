import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'all categories'
  }

  static propType = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  handaleNextClick = async () => {
      let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=787e4ee6cc3243b8ac0580de86107186&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading:false
      });
  }

  handalePreviousClick = async () => {
      let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=787e4ee6cc3243b8ac0580de86107186&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parseData.articles,
        loading:false
      });
  }

  async componentDidMount() {
    console.log('page size :- ',this.props.pageSize);
    let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=787e4ee6cc3243b8ac0580de86107186&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles, 
      totalResults:parseData.totalResults,
      loading:false
    });
  }
  
  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">News Hunter  - Top HeadLines </h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4 my-2" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0,45) : ''} imageUrl={element.urlToImage} description={element.description ? element.description.slice(0,88) : ''} newsUrl={element.url} />
            </div>
        })}
        </div>
        <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" onClick={this.handalePreviousClick} className="btn btn-dark"> &larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handaleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>    
      </div>
    )
  }
}

export default News