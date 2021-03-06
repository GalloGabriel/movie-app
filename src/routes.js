
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';
import Erro from './pages/Erro';
import Assistidos from './pages/Assistidos';

const Routes = () => {
  return(
    <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/filme/:id" component={Filme} />
          <Route exact path="/favoritos" component={Favoritos} />
          <Route exact path="/meusfilmes" component={Assistidos} />
          <Route path="*" component={Erro} />
        </Switch>

        <Footer />
        
    </BrowserRouter>
  );
}

export default Routes;