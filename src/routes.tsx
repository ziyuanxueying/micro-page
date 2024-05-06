import { Navigate } from 'react-router-dom'
import Editor from './page-editor/index'

const routes = [
  // Navigate 重定向
  { path: '/', element: <Navigate to="/editor" /> },
  { path: '/editor', element: <Editor /> },
  // {
  //   path: '/friend',
  //   element: <Friend />,
  //   children: [{ path: 'chat/:name', element: <Chat /> }],
  // },
  // { path: '/setting', element: <Setting /> },
  // { path: '*', element: <NotFound /> },
]

export default routes
