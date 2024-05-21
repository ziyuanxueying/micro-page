import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Content from './components/Content.tsx'
import Items from './components/items/index.tsx'
import Setting from './components/Setting.tsx'

const TemplateEngine = () => {
  // const onDataChange = (data: any) => {
  //   const item = components.find(item => item.id === selected.id)
  //   item && (item.data = data)
  //   // 更新组件数据
  //   setComponents([...components])
  // }

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
