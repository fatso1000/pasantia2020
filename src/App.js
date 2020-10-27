import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// COMPONENTS
import Navbar from './components/navbar.component';
import realtimeValues from './components/realtime-values.component';

// ROUTES
function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <br />
        {/* Cada ruta muestra un componente distinto */}
        <Route path="/" exact component={realtimeValues} />
      </Router>
    </div>
  );
}

export default App;
