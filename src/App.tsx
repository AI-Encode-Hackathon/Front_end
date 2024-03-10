import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './pages/home';
import AutoML from './pages/automl';
import EvaluationComponent from './pages/evaluation';


 const App: React.FC = () => {


  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="evaluation" element={<EvaluationComponent />} />
        <Route path="automl" element={<AutoML />} />
      </Routes>
  </BrowserRouter>
  )
 }

export default App;
