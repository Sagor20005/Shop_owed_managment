import {
  BrowserRouter
} from 'react-router-dom'
import './App.css';
import {
  Navbar,
  Sidebar,
  Content
} from "./Import"

function App() {
  return (
    <>
      {
      <div className="App">
        <BrowserRouter>
            <Navbar />
            <div className="body">
              <Sidebar />
              <Content />
            </div>
        </BrowserRouter>
      </div>
      }
    </>
  );
}

export default App;