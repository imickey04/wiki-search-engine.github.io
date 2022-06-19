import { useState } from "react";

function App() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  
  const handleSearch = async e => {

    e.preventDefault();

    if (search === '') return;

    const endpoint = `https://en.wikipedia.org/w/api.php?
    action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok){
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);

    // console.log(search);
    // console.log(json);
  }

  return (
    <div className="App">
      <header>
        <h1>Wiki Engine</h1>
        <form onSubmit={ handleSearch } className="search-box">
          <input
            type="search"
            placeholder='Satisfy Your Curiosity By Searching Here...'
            value = { search }
            onChange = { e => setSearch(e.target.value) }
          />
          <div className="button">
            <button type="submit">Binge</button>
          </div>
        </form>
        {(searchInfo.totalhits) ? <p className="para">Search Results: { searchInfo.totalhits } <br /> <br />created by: <br /> <strong>Mayank Chanabhatti</strong> </p> : 
        '' }
      </header>
      <div className="results">
        {results.map((result, i) => {

            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

            return (

              <div className="result" key = {i}>
                <h3>{ result.title }</h3>
                <p dangerouslySetInnerHTML={ { __html: result.snippet } }>
                    
                </p>
                <a href={url} target="_blank" rel="noreferrer">Read more...</a>
              </div>

            )
        })}
      </div>
    </div>
  );
}

export default App;
