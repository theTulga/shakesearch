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
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowImage(false)
    
    fetch(`/search?q=${query}`)
      .then((response) => {
        response.json().then(data => {
          console.log("CALLING SET RESULTS")
          setResults(data)
          setResultVisible(true)
        })
      })
  }

  const handleUpdate = (e) => {
    setQuery(e.target.value)
  }

  const renderedResult = results.map( (r, i) => {
    let indx = r.toLowerCase().indexOf(query)
    if (!resultVisible) return null
    return (
      <div className="individual-result" key={i}>
        <pre>
          {
            r.substring(0, indx) 
          }
        </pre>
        
          
        <b>{r.substring(indx, indx + query.length)}</b>
        <pre >
          {
            r.substring(indx + query.length)
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
