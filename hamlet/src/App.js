import { useState, useRef } from "react" 
import './App.css';
import { FiSearch, FiArrowRight } from "react-icons/fi";
import shakesphere from './assets/shakesphere.png'
import { Transition, CSSTransition } from 'react-transition-group';

function App() {
  const [ query, setQuery ] = useState("");
  const [ showImage, setShowImage ] = useState(true);
  const [ resultVisible, setResultVisible] = useState(false);
  const [ results, setResults ] = useState([]);
  const nodeRef = useRef(null)
  const [ lastQuery, setLastQuery ] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowImage(false)
    // console.log("SUBMITTING", query)
    fetch(`/search?q=${query}`)
      .then((response) => {
        response.json().then(data => {
          setLastQuery(query)
          
          if (data.length == 0) {
            setResults(["No results found"])
          } else {
            setResults(data)
          }
          setResultVisible(true)
          // console.log("LAST QUERY IS NOW", query)
        })
      })
  }

  const handleUpdate = (e) => {
    setQuery(e.target.value)
  }

  const renderedResult = results.map( (r, i) => {
    let indx = r.toLowerCase().indexOf(lastQuery.toLowerCase())
    if (!resultVisible) return null
    if (indx == -1) {
      return (
        <div className="individual-result" key={i}>
          <pre>
            {r}
          </pre>
        </div>
      )
    }
    return (
      <div className="individual-result" key={i}>
        <pre>
          {
            r.substring(0, indx) 
          }
        </pre>
        
          
        <b>{r.substring(indx, indx + lastQuery.length)}</b>
        <pre >
          {
            r.substring(indx + lastQuery.length)
          }
        </pre>  
      </div>
    )
  })

  return (
    <div className="App">
      <div className="upperleft-title">
        Shakesearch
      </div>
      <div className="search-section" onSubmit={handleSubmit}>
        <form className="left-box">
          <FiSearch size="40px" /> 
          <input value={query} onChange={handleUpdate} className="search-bar" placeholder="What art thee looking f'r?"/>
          <button className="submit-btn">
          {
            query !== "" 
              ? <FiArrowRight size="40px" />
              : null
          }
          </button> 
        </form>
        {
          resultVisible ? (
            <div className="result-container">
              {renderedResult}
            </div>
          ) : null
        }
        
        <CSSTransition 
          nodeRef={nodeRef}
          in={showImage} 
          timeout={500} 
          className="shake"
          mountOnEnter
          unmountOnExit>
          <img src={shakesphere} alt="Shake Sphere" />  
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
