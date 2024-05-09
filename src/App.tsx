import routes from './routes'

function App() {
  const ElementRouter = useRoutes(routes)
  return <div className="h-screen p-5">{ElementRouter}</div>
}

export default App
