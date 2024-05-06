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
