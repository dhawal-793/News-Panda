import React from "react";
import Demo_Image from "../Images/Demo_Image.jpg";
const NewsItem = (props) => {
  let { title, description, urlToImage, newsurl, author, date, sources } =
    props;
  return (
    <div className="container ">
      <div className="card shadow-lg p-1 mb-5 bg-body rounded">
        <div
          style={{
            display: "flex",
            position: "absolute",
            justifyContent: "flex-end",
            right: "4.1px",
          }}
        >
          <span className="badge bg-danger">
            Article By - {sources ? sources : "Unknown"}
          </span>
        </div>
        <img
          src={urlToImage ? urlToImage : Demo_Image}
          className="card-img-top"
          // style={{
          //   maxHeight: "248.550px",
          //   minHeight: "198.97px",
          // }}
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-primary">
              Published by {author ? author : "Unknown"} on{" "}
              {new Date(date).toGMTString()}
            </small>{" "}
          </p>
          <a
            href={newsurl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
