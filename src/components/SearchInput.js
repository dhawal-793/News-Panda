import React from "react";
import { Link } from "react-router-dom";

const SearchInput = (props) => {
  return (
    <>
      <div className="container py-2 my-2" style={{ maxWidth: "70vw" }}>
        <div className="input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            value={props.query}
            onChange={props.queryChanged}
            onKeyUp={props.pathChanged}
            placeholder="Search News Keywords"
            aria-label="Search"
            aria-describedby="search-addon"
            required
          />
          <Link
            // onClick={props.changedSearch}
            className="input-group-text nav-link border-0"
            id="search-addon"
            to={props.queryPath}
            // {setTimeout(props.queryPath, 2000)}
          >
            <i className="fa fa-search"></i>
            {/* <button onClick={props.searchClicked}><i className="fa fa-search"></i></button> */}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
