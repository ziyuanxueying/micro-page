import { Navigate } from 'react-router-dom'
import Editor from './page-editor/index'
import Promotion from './page-promotion/index'

const routes = [
  { path: '/', element: <Navigate to="/editor" /> },
  { path: '/promotion', element: <Promotion /> },
  { path: '/editor', element: <Editor /> },
  { path: '*', element: <Navigate to="/editor" /> },
]

export default routes
