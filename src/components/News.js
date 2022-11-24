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

  updateNews = async () => {
      console.log("page is :- ",this.state.page);
      const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=82e9fff0f8884d06a7277f48ec808e3d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: parseData.articles,
        loading:false
      });  
  }

  handaleNextClick = () => {
    console.log("page before next is :- ",this.state.page);  
    this.setState({
        page: this.state.page + 1
      });
      console.log("page after next is :- ",this.state.page);
      // this.updateNews();
  }

  handalePreviousClick = async () => {
    console.log("page before minus 1 is :- ",this.state.page);
    this.setState({page: this.state.page - 1});
    console.log("page after minus 1 is :- ",this.state.page);
    // this.updateNews();
  }

  async componentDidMount() {
    this.updateNews();
  }
  
  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">News Hunter  - Top HeadLines </h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4 my-2" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0,45) : ''} imageUrl={element.urlToImage} description={element.description ? element.description.slice(0,88) : ''} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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