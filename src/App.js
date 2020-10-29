import Main from './components/Main';
import Pages from './components/Pages/Pages';
import { HashRouter, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Main} />
      <Route path="/pages" component={Pages} />
    </HashRouter>
  )
}

export default App;
