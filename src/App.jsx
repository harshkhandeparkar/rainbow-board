import Main from './components/Main.jsx';
import Pages from './components/Pages/Pages.jsx';
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
