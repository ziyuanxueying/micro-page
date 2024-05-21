import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MetasBar from './metas-bar/index.tsx'
import Content from './content/index.tsx'
import Setting from './setting/index.tsx'

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
        <MetasBar />
        <Content />
        <Setting />
      </main>
    </DndProvider>
  )
}

export default TemplateEngine
