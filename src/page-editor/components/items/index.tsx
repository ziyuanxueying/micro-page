import { MateType, MatesType } from '../../type'
import './index.less'
interface ItemProps {
  metas: MatesType
  pushModule: (meta: MateType) => void
}
const Content = (props: ItemProps) => {
  // useEffect(() => {
  //   console.log(123)
  // }, [props.metas])
  return (
    <>
      {Object.entries(props.metas).map(([key, value]) => (
        <div key={key}>
          <div>{`${key}`}</div>
          <div className="meta-group flex-row">
            {value.map(meta => (
              <div
                key={meta.groupType}
                className="flex-column meta"
                onClick={() => props.pushModule(meta)}
              >
                <img
                  src={new URL(`../../../assets/${meta.icon}.svg`, import.meta.url).href}
                  alt=""
                />
                {meta.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default Content
