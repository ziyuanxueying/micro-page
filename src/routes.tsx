import { Navigate } from 'react-router-dom'
import Editor from './page-editor/index'

const routes = [
  { path: '/', element: <Navigate to="/editor" /> },
  { path: '/editor', element: <Editor /> },
  { path: '*', element: <Navigate to="/editor" /> },
]

export default routes
