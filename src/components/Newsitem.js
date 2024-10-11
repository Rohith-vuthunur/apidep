import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageurl,readurl,pubdate,names} =  this.props;

    return (
      <div>
            <div className="card my-4 mx-2 p-2 mydiv" style={{width: "18rem"}}>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-2 " style={{left:"90",zIndex:1}}>{names}
            </span>
                <img src={imageurl} className="card-img-top images" alt="..."/>
                
                <div className="card-body">
                    <h5 className="card-title ">{title}...</h5>
                    <p className="card-text">{description}....</p>
                    <p className="card-text"><small className="text-muted">{pubdate}</small></p>
                    <a href={readurl} className="btn btn-primary">Read More</a>
                </div>
            </div>
      </div>
    )
  }
}

export default Newsitem
