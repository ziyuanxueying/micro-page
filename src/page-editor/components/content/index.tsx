import ItemTemplate from '../item-template'
interface ContentProps {
  components: Array<any>
}
const Content = (props: ContentProps) => {
  // useEffect(() => {}, [props.components])
  return (
    <>
      {props.components.map(item => (
        <ItemTemplate key={item.id} type={item.temModule} />
      ))}
    </>
  )
}

export default Content
