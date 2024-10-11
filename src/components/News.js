import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';



export class News extends Component {
   
    constructor(){
        super();
        // console.log("I am  a constructor and calling the super class");
        this.state = {
            articles : [],
            loading : false,
            page : 1,
                }
    }
    static defaultProps ={
        category : "general",
    }
    
   
    async componentDidMount(){
        let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apikey=9281516926d842e59ac225f31839ebd4&page=1&pageSize=20`;
        let data = await fetch(url);
        this.setState({loading:true});
        let parseddata = await data.json();
        this.setState({articles : parseddata.articles,
            totalResults: parseddata.totalResults,
            loading:false,
        });
        console.log(parseddata);
    }
    handlenext = async()=>{
        let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apikey=9281516926d842e59ac225f31839ebd4&page=${this.state.page+1}&pageSize=20`;
        let data = await fetch(url);
        this.setState({loading:true});
        let parseddata = await data.json();
        this.setState({articles : parseddata.articles,
            totalResults: parseddata.totalResults,
            page : this.state.page+1,
            loading:false,
        });
        console.log("next");
    }
    handleprevious = async()=>{
        let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apikey=9281516926d842e59ac225f31839ebd4&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);
        this.setState({loading:true});
        let parseddata = await data.json();
        this.setState({articles : parseddata.articles,
            page : this.state.page-1,
            totalResults: parseddata.totalResults,
            loading:false,
        });
        console.log("prev");
    }
  render() {
    return (
      <div className="container">
        <h3 className="my-4 text-center" >Bear News - Top Headlines</h3>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return  <div className="col md-4" key={element.url}>

                <Newsitem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,45):""} imageurl= {element.urlToImage} readurl={element.url} pubdate={element.publishedAt} names={element.source.name}/>
               
                        </div>
            })}
            
            
                
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-outline-dark" disabled={this.state.page<=1} onClick={this.handleprevious}>&larr; Previous</button>
        <button type="button" disabled={this.state.page+1>=5}  className="btn btn-outline-dark" onClick={this.handlenext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
