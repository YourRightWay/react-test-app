import React, {Component} from 'react';
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Main />
      </div>
    );
  }
}

export default App;
