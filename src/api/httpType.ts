export interface StoreType {
  org?: OrgParamsType
  user?: UserParamsType
  token?: string
  operations?: string
}

export interface OrgParamsType {
  groupCode: string
  areaCode: string
  centerCode: string
  plazaCode: string
  storeCode: string
  code: string
  name: string
  orgTypeCode: string
  orgTypeName: string
}

export interface UserParamsType {
  id: string
  name: string
  tenantId: string
  [key: string]: any
}
