import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component{

    static defaultProps = {
        country: 'ch',
        pageSize: 5,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    // Rendering: constructor ->  componentDidMount

    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            apiKey: 'f5f545c7bbb743e596b82a5db9abad91'
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - MyNews`;
    }
    
    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();         // change to json file
        this.setState({
            articles: parseData.articles, 
            totalResults: parseData.totalResults,
            loading: false});
    }

    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick = async() => {
        /*
        if(!(this.state.page - 1 > Math.ceil(this.state.totalResults / this.props.pageSize)))
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5f545c7bbb743e596b82a5db9abad91&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parseData = await data.json();         // change to json file
            this.setState({
                page: this.state.page - 1,
                articles: parseData.articles,
                loading: false
            })
        }*/
        this.setState({page: this.state.page - 1})
        this.updateNews()
    }

    handleNextClick = async () =>{
        /*
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)))
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=f5f545c7bbb743e596b82a5db9abad91&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parseData = await data.json();         // change to json file
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }*/
        this.setState({page: this.state.page + 1})
        this.updateNews()
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();         // change to json file
        this.setState({
            articles: this.state.articles.concat(parseData.articles), 
            totalResults: parseData.totalResults,
            loading: false
        });
    }

    render(){
        return(
            <>
                <h1 className='text-center'>My News - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} category </h1>
                {/*{this.state.loading && <Spinner/>}*/}
                <InfiniteScroll
                    dataLength = {this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                    >

                <div className='container'>
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title? element.title.slice(0,45) : ""} 
                                description={element.description? element.description.slice(0,88) : ""} 
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                            </div>
                        })}
                    </div>
                </div>
                </InfiniteScroll>

                {/*
                <div className='container d-flex justify-content-between'>
                    &larr; = left arrow, &rarr; = right arrow
                    <button disabled={this.state.page <= 1} type='button' 
                      className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>

                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/12)} type='button' 
                      className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                */}
            </>
        )
    }
}

export default News