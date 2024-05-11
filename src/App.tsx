import routes from './routes'

const appCss = css({
  height: '100vh',
  padding: 20,
})

function App() {
  const ElementRouter = useRoutes(routes)
  return <div css={appCss}>{ElementRouter}</div>
}

export default App
