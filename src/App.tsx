import routes from './routes'

function App() {
  const router = useRoutes(routes)

  return (
    <div
      css={{
        height: '100vh',
        padding: 20,
      }}
    >
      {router}
    </div>
  )
}

export default App
