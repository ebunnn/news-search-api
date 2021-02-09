import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      eachArticle: [],
      isLoaded: true,
      error: null,
      searchWords: null,
      category: "entertainment",
      submit: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.apiCall = this.apiCall.bind(this)
  }
  
  handleChange(event) {
    const {name, value} = event.target
    console.log('Name: ' + name)
    this.setState({ [name]: value })
  }
  handleOnChange(event) {
    this.setState({
      searchWords: event.target.value
    })
  }
  handleSearch() {
      this.apiCall(this.state.searchWords)
    console.log(this.state.submit)
  }

  apiCall() {
    var url = 'http://newsapi.org/v2/top-headlines?' +
              'country=us&' +
              'q=' + this.state.searchWords + '&' +
              'category=' + this.state.category + '&' +
              'apiKey=a65be5a231ab46f4b657d0e16351d2c8';
    var req = new Request(url);
     fetch(req)
      .then((response) => response.json())  
      .then(result => {
        console.log(result)
          this.setState({
            isLoaded: true,
            eachArticle: result.articles
      })
},    (error) => {
        this.setState({
          isLoaded: true,
          error
       });
   }
)
}

  render () {
    // if(article.author === null) {
    //   article.author = ""
    // }
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div><h1>Loading...</h1></div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
          <div className="main-title">  
            <h1>News Search</h1>
          </div>
          <div className="search-bar">
            <input type="text" name="searchWords" placeholder="Choose a Category, Then Search..." onChange={(e)=>this.handleOnChange(e)} value={this.state.searchWords}/>
            <button className="search-button" onClick={this.handleSearch}>Search</button>
          </div>
          <div className="radio-buttons">
            <form>
              <label>
                <input name="category" checked={this.state.category === "Entertainment"} type="radio" onClick={this.handleChange} value="Entertainment"/>
                <span className="radio-dot"></span>
                 Entertainment
              </label>
            </form>
            <form>
              <label>
                <input name="category" checked={this.state.category === "Sports"} type="radio" onClick={this.handleChange} value="Sports"/> 
                <span className="radio-dot"></span>
                Sports
              </label>
            </form>
            <form>
              <label>
                <input name="category" checked={this.state.category === "Technology"} type="radio" onClick={this.handleChange} value="Technology"/> 
                <span className="radio-dot"></span>
                Technology
              </label>
            </form>
          </div>
          </header>
          <div className='news-body'>
            {this.state.eachArticle.map(article => (
                <div key={article.source.id} className="body-box">
                  <h1>{article.title}</h1>
                  <p>Written By: {article.author}</p>
                  <img src={article.urlToImage} alt="Article Image"/>
                  <h3>{article.description}</h3>
                  <p><a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Story Here</a></p>
                </div>
              ))}
          </div>
        </div>
      );
    }
  }
}

    

export default App;
