// REACT_APP_NEWS_API1 = "28ab0a2bdd0a4e3898e9990bd452abe7"
// REACT_APP_NEWS_API2 = "1ffa4e9680364c4bb45d0f5415e96e3f"
// REACT_APP_NEWS_API3 = "9b493091d4294f5791343904415ecd9a"

import "./App.css";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
// import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import News from "./components/News";
import SearchNews from "./components/SearchNews";
import SearchInput from "./components/SearchInput";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const API_KEY = process.env.REACT_APP_NEWS_API;
  const pageSize = 9;
  const country = "in";

  const [newsType, setNewsType] = useState("top");
  const [query, setQuery] = useState("");
  const [queryPath, setQueryPath] = useState("/search");
  const [progress, setProgress] = useState(0);

  const toggleNews = () => {
    if (newsType === "top") {
      setNewsType("all");
    } else {
      setNewsType("top");
    }
  };

  const queryChanged = (event) => {
    setQuery(event.target.value);
  };

  const updateProgress = (rprogress) => {
    setProgress(rprogress);
  };

  const pathChanged = () => {
    let text = query.trim().split(/[ ]/);
    text = text.join(" ");
    setQueryPath(`/search/${text}`);
  };

  return (
    <>
      <Router>
        {/* <Navbar mode={mode} toggleMode={toggleMode} title="NewsPanda" /> */}
        <Navbar title="NewsPanda" toggleNews={toggleNews} />
        <LoadingBar color="rgb(170,201,235)" height="3px" progress={progress} />
        <div className="container py-5"></div>
        <SearchInput
          query={query}
          queryChanged={queryChanged}
          queryPath={queryPath}
          pathChanged={pathChanged}
        />
        <Routes>
          <Route
            exact
            path={queryPath}
            element={
              <SearchNews
                API_KEY={API_KEY}
                updateProgress={updateProgress}
                key="search"
                pagesize={pageSize}
                newsType={newsType}
                query={query}
                queryChanged={queryChanged}
                queryPath={queryPath}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <News
                API_KEY={API_KEY}
                key="general"
                category="general"
                updateProgress={updateProgress}
                country={country}
                pagesize={pageSize}
                newsType={newsType}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                API_KEY={API_KEY}
                key="sports"
                category="sports"
                updateProgress={updateProgress}
                country={country}
                pagesize={pageSize}
                newsType={newsType}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                API_KEY={API_KEY}
                key="business"
                category="business"
                updateProgress={updateProgress}
                country={country}
                pagesize={pageSize}
                newsType={newsType}
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                API_KEY={API_KEY}
                key="entertainment"
                category="entertainment"
                updateProgress={updateProgress}
                country={country}
                pagesize={pageSize}
                newsType={newsType}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                API_KEY={API_KEY}
                key="health"
                category="health"
                updateProgress={updateProgress}
                country={country}
                pagesize={pageSize}
                newsType={newsType}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                API_KEY={API_KEY}
                key="science"
                category="science"
                updateProgress={updateProgress}
                country={country}
                pagesize={pageSize}
                newsType={newsType}
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                API_KEY={API_KEY}
                key="technology"
                category="technology"
                updateProgress={updateProgress}
                country={country}
                pagesize={pageSize}
                newsType={newsType}
              />
            }
          />

          <Route exact path="/about" element={<About />} />
        </Routes>
      <Footer />
      </Router>
    </>
  );
};

export default App;
