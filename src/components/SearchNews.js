import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Loading from "./Loading";

const SearchNews = (props) => {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const query = props.query.trim();

  const [serverNotFound, setServerNotFound] = useState(false);
  // const [newsType, setNewsType] = useState(props.newsType)

  const loadNews = async () => {
    props.updateProgress(15);
    const url = `https://newsapi.org/v2/top-headlines?&q=${query}&apiKey=${props.API_KEY}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.updateProgress(40);
    if (data.status === 429) {
      setTotalResults(0);
      setLoading(false);
      setServerNotFound(true);
    } else {
      let parsedData = await data.json();
      props.updateProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    }
    props.updateProgress(100);
  };

  useEffect(() => {
    document.title = `NewsPanda - ${capitalize(props.query.trim())}`;
    loadNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?&q=${query}&apiKey=${
      props.API_KEY
    }&page=${page + 1}&pagesize=${props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      {serverNotFound === true ? (
        <div className="container px-3 my-5" style={{ maxWidth: "60vw" }}>
          <div className="card text-white bg-dark ">
            <div className="card-header pl-4">Your Searched "{query}"</div>
            <div className="card-body text-center">
              <h5 className="card-title ">Opps...</h5>
              <p className="card-text ">
                No News Available Related to the Searched Query,
              </p>
              <p className="card-text ">Please try some different keyword...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-8">
          <h2 className="text-center my-4">
            NewsPanda - Top Headlines Related to {query.toUpperCase()}
          </h2>
          {loading && <Loading />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Loading />}
          >
            {
              <div className="container">
                <div className="row p-2">
                  {!loading && totalResults < 1 ? (
                    <div
                      className="container px-3 my-5"
                      style={{ maxWidth: "60vw" }}
                    >
                      <div className="card text-white bg-dark ">
                        <div className="card-header pl-4">
                          You Searched - {query}
                        </div>
                        <div className="card-body text-center">
                          <h5 className="card-title ">Opps...</h5>
                          <p className="card-text ">
                            No News available related to searched query,
                          </p>
                          <p className="card-text ">
                            Please try something else...
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    articles.map((element) => {
                      return (
                        <div className="col-md-4 p-2" key={element.url}>
                          <NewsItem
                            Item
                            title={element.title}
                            description={element.description}
                            urlToImage={element.urlToImage}
                            newsurl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            }
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

SearchNews.defaultProps = {
  pagesize: 12,
  query: "",
  newsType: "top",
};
SearchNews.propTypes = {
  pagesize: PropTypes.number,
  query: PropTypes.string,
  newsType: PropTypes.string,
};
export default SearchNews;
