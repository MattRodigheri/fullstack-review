import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    let context = this;
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: "http://localhost:1128/repos",
      data: {userName: term},
      success: function() {
        console.log('successful post')
        context.componentDidMount() //logging db data in console, move this to html!
      },
      error: function() {
        console.log("error")
      }
    })
  }

  componentDidMount () {//immediately invoked
    let context = this;
    $.ajax({
      type: 'GET',
      url: "http://localhost:1128/repos",
      success: function(data) {
        console.log(data);
        context.setState({
          repos: data
        })
      },
      error: function() {
        console.log("GET error")
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
