import React from 'react';

const NewsItem = (props) =>{
        let {title, description, imageUrl, newsUrl, author, date} = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style ={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>

                        <span className='badge round-pill bg-danger'></span>
                    </div>
                    <img src={imageUrl? imageUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'} 
                      className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title} 
                                <span className='badge rounded-pill bg-success'>New</span>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                                </span>
                            </h5>
                                <p className="card-text">
                                    <small className="text-muted">By {author? author: "Unknown"} On {new Date(date).toGMTString()}</small>{description}
                                </p>
                            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
                        </div>
                </div>
            </div>
        )
}

export default NewsItem