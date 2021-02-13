import Main from './components/Main.jsx';
import Pages from './components/Pages/Pages.jsx';
import { HashRouter, Route } from 'react-router-dom';
import Credits from './components/Credits/Credits';

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Main} />
      <Route path="/pages" component={Pages} />
      <Route path="/credits" component={Credits} />
    </HashRouter>
  )
}

export default App;
