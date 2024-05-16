export interface MateType {
  name: string
  group: string
  icon: string
  groupType: string
  temModule: string
  setModule: string
}
export type MatesType = {
  [key: string]: MateType[]
}
export type ItemType = {
  [key: string]: React.ComponentType<any>
}
export interface componentsType {
  id: string | number
  groupType: string
  temModule: string
  setModule: string
  data: any // 这里的 any 可以替换为具体的数据类型
}
