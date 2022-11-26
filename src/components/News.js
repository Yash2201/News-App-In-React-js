import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  Ismounted = true;
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:''
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
      page: 1,
      totalResults: 0
    }
  }

  fetchMoreData = async () => {
    if(this.Ismounted)
    {
      this.props.setProgress(0);
      this.setState({ page: this.state.page +  1});
      const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(30);
      let parseData = await data.json();
      this.props.setProgress(70);
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        loading:false,
        totalResults: parseData.totalResults
      });
      this.props.setProgress(100);
    }
    else
    {
      this.setState({ page: this.state.page +  1});
      const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        loading:false,
        totalResults: parseData.totalResults
      });
    }
  };

  componentDidMount() {
    if(this.Ismounted)
    {
      this.fetchMoreData();
      this.Ismounted = false;
    }
  }
  
  render() {
    return (
      <>
        <h2 className="text-center my-4">News Hunter  - Top HeadLines </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-2">
            <div className="row">
              {this.state.articles.map((element)=>{
                  return  <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0,45) : ''} imageUrl={element.urlToImage} description={element.description ? element.description.slice(0,88) : ''} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
              })}
            </div>
          </div>
        </InfiniteScroll>  
      </>
    )
  }
}

export default News