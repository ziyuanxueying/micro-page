import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Content from './components/Content.tsx'
import Items from './components/items/index.tsx'
import Setting from './components/Setting.tsx'

const TemplateEngine = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main
        css={css({
          display: 'flex',
          gap: 12,
          height: '100%',
        })}
      >
        <Items />
        <Content />
        <Setting />
      </main>
    </DndProvider>
  )
}

export default TemplateEngine
