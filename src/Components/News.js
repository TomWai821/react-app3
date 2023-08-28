import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)

    // Rendering: constructor ->  componentDidMount
    const capitcalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();         // change to json file
        props.setProgress(70);
        setArticles(parseData.articles)
        setTotalResult(parseData.totalResult)
        setLoading(parseData.loading)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    const handlePrevClick = async () => {
        /*
        if(!(this.state.page - 1 > Math.ceil(this.state.totalResults / props.pageSize)))
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f5f545c7bbb743e596b82a5db9abad91&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parseData = await data.json();         // change to json file
            this.setState({
                page: this.state.page - 1,
                articles: parseData.articles,
                loading: false
            })
        }*/
        setPage(page - 1)
        updateNews()
    }

    const handleNextClick = async () => {
        /*
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)))
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=f5f545c7bbb743e596b82a5db9abad91&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parseData = await data.json();         // change to json file
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }*/
        setPage(page + 1)
        updateNews()
    }

    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();         // change to json file
        setArticles(articles.concat(parseData.articles))
        setTotalResult(parseData.totalResult)
    }
    return (
        <>
            <h1 className='text-center'>My News - Top Headlines from {capitcalizeFirstLetter(props.category)} category </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={<Spinner />}
            >

                <div className='container'>
                    <div className="row">
                        {!loading && articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 88) : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
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


News.defaultProps = {
    country: 'hk',
    pageSize: 6,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
}
export default News