import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'virtual:uno.css'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
