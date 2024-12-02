import useStore, { Component } from '@/store'
import { Form, Button, Segmented } from 'antd'
import { WdAllocation } from '@wd/component-ui'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import MaterialBtn from '@/page-editor/components/MaterialBtn'
import { SetTitle } from '@/styles/global'
import { authorizePlaza } from '@/utils'
const ImageSet = () => {
  const { components, selectedComponentId, updateComponent } = useStore()
  const setting = components.find(c => c.id === selectedComponentId) as Component
  const formDisabled = setting.data?.authorizePlaza !== authorizePlaza
  console.log('ImageSet formDisabled: ', formDisabled)
  const [form] = Form.useForm()

  const handleModuleTypeChange = () => {
    const { moduleType, pictures } = form.getFieldsValue()
    const nextPictures = moduleType === 'image' ? pictures.slice(0, 1) : pictures
    form.setFieldValue('pictures', nextPictures)
    setting &&
      updateComponent(selectedComponentId, {
        ...setting,
        moduleType,
        data: {
          ...setting?.data,
          moduleType,
          pictures: nextPictures,
        },
      })
  }
  return (
    <>
      <SetTitle>图片</SetTitle>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={{
          ...setting?.data,
          pictures: setting?.data?.pictures.length
            ? setting.data.pictures
            : Array(setting?.data?.moduleType).fill(undefined),
        }}
        onValuesChange={(_, allValues: any) => {
          setting &&
            updateComponent(selectedComponentId, {
              ...setting,
              moduleType: allValues.moduleType,
              data: { ...setting?.data, ...allValues },
            })
        }}
        disabled={formDisabled}
      >
        <Form.Item label="选择模板" name="moduleType">
          <Segmented
            onChange={handleModuleTypeChange}
            disabled={formDisabled}
            options={[
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      width="32px"
                      height="32px"
                      viewBox="0 0 16 16"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>单张</title>
                      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g
                          id="营销推广-创建微页面图片6-1"
                          transform="translate(-1168, -196)"
                          fillRule="nonzero"
                        >
                          <g id="单张" transform="translate(1168, 196)">
                            <rect
                              id="矩形"
                              fill="#000000"
                              opacity="0"
                              x="0"
                              y="0"
                              width="16"
                              height="16"
                            ></rect>
                            <path
                              d="M14,0.6671875 L2,0.6671875 C0.895741712,0.667627478 0.000796875,1.56292912 0.000796875,2.6671875 L0.000796875,11.3344063 C0.000796875,12.4389757 0.896227375,13.3344063 2.00079687,13.3344063 L14,13.3335938 C15.1045695,13.3335938 16,12.4381632 16,11.3335938 L16,2.6671875 C16,1.562618 15.1045695,0.6671875 14,0.6671875 L14,0.6671875 Z M14.6664063,11.3344063 C14.6664063,11.7024063 14.368,12.0008125 14,12.0008125 L5.6071875,12.0008125 L10.3871875,7.2208125 L10.3887969,7.21920313 C10.9097228,6.69920374 11.753548,6.69991726 12.2735938,7.22079688 L14.6664063,9.60720313 L14.6664063,11.334375 L14.6664063,11.3344063 Z M14.6672031,7.72640625 L13.2207969,6.28 C12.1644854,5.27297158 10.5035146,5.27297158 9.44720312,6.28 L3.7271875,12 L2,12 C1.63195399,12 1.33359375,11.7016398 1.33359375,11.3335938 L1.33359375,2.6671875 C1.33359375,2.29920313 1.632,2.00079688 2,2.00079688 L14.0007969,2.00079688 C14.3687969,2.00079688 14.6672031,2.29920313 14.6672031,2.66720313 L14.6672031,7.72640625 L14.6672031,7.72640625 Z M4.6671875,3.33359375 C3.562618,3.33359375 2.6671875,4.22902425 2.6671875,5.33359375 C2.6671875,6.43816325 3.562618,7.33359375 4.6671875,7.33359375 C5.771757,7.33359375 6.6671875,6.43816325 6.6671875,5.33359375 C6.6671875,4.22902425 5.771757,3.33359375 4.6671875,3.33359375 Z M4.66640625,6 C4.42832222,6 4.20832351,5.87298369 4.08928149,5.66679688 C3.97023948,5.46061007 3.97023948,5.20657743 4.08928149,5.00039062 C4.20832351,4.79420381 4.42832222,4.6671875 4.66640625,4.6671875 C5.03445225,4.6671875 5.33281248,4.96554775 5.33281248,5.33359375 C5.33281248,5.70163975 5.03445225,6 4.66640625,6 Z"
                              id="形状"
                              fill={setting?.moduleType === 'image' ? '#006EFF' : '#D8D8D8'}
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <div>单张</div>
                  </div>
                ),
                value: 'image',
              },
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      width="32px"
                      height="32px"
                      viewBox="0 0 16 16"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>图片轮播</title>
                      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g
                          id="营销推广-创建微页面图片6-1"
                          transform="translate(-1210, -195)"
                          fillRule="nonzero"
                        >
                          <g id="图片轮播" transform="translate(1210, 195)">
                            <rect
                              id="矩形"
                              fill="#000000"
                              opacity="0"
                              x="0"
                              y="0"
                              width="16"
                              height="16"
                            ></rect>
                            <path
                              d="M14.6664068,15.3335938 C14.6664068,14.9655477 14.368046,14.6671856 14,14.6671856 L8.6671875,14.6671856 C8.2991415,14.6663073 8.00006772,14.963954 7.99918557,15.332 C7.99830731,15.700046 8.295954,15.9991198 8.664,16 L14.0047969,16 C14.3711543,15.9978072 14.66686,15.6999575 14.6664068,15.3335937 L14.6664068,15.3335938 Z M6.66720365,15.3335937 C6.66720365,14.9655538 6.36883678,14.6671855 6.00079687,14.6671855 L2.00079687,14.6671855 C1.63275087,14.666303 1.3336736,14.9639462 1.33278712,15.3319922 C1.33190457,15.7000382 1.62954775,15.9991155 1.99759375,16 L6.00559375,16 C6.37195122,15.9978072 6.66765691,15.6999575 6.66720365,15.3335937 L6.66720365,15.3335937 Z M14,0.6671875 L2,0.6671875 C0.895741712,0.667627478 0.000796875,1.56292912 0.000796875,2.6671875 L0.000796875,11.3344063 C0.000796875,12.4389757 0.896227375,13.3344063 2.00079687,13.3344063 L14,13.3335938 C15.1045695,13.3335938 16,12.4381632 16,11.3335938 L16,2.6671875 C16,1.562618 15.1045695,0.6671875 14,0.6671875 L14,0.6671875 Z M14.6664062,11.3344063 C14.6664062,11.7024063 14.368,12.0008125 14,12.0008125 L5.6071875,12.0008125 L10.3871875,7.2208125 L10.3887969,7.21920312 C10.9097228,6.69920374 11.753548,6.69991726 12.2735937,7.22079687 L14.6664062,9.60720312 L14.6664062,11.334375 L14.6664062,11.3344063 Z M14.6672031,7.72640625 L13.2207969,6.28 C12.1644854,5.27297158 10.5035146,5.27297158 9.44720312,6.28 L3.7271875,12 L2,12 C1.63195399,12 1.33359375,11.7016398 1.33359375,11.3335938 L1.33359375,2.6671875 C1.33359375,2.29920313 1.632,2.00079688 2,2.00079688 L14.0007969,2.00079688 C14.3687969,2.00079688 14.6672031,2.29920313 14.6672031,2.66720313 L14.6672031,7.72640625 L14.6672031,7.72640625 Z M4.6671875,3.33359375 C3.562618,3.33359375 2.6671875,4.22902425 2.6671875,5.33359375 C2.6671875,6.43816325 3.562618,7.33359375 4.6671875,7.33359375 C5.771757,7.33359375 6.6671875,6.43816325 6.6671875,5.33359375 C6.6671875,4.22902425 5.771757,3.33359375 4.6671875,3.33359375 Z M4.66640625,6 C4.42832222,6 4.20832351,5.87298369 4.08928149,5.66679688 C3.97023948,5.46061007 3.97023948,5.20657743 4.08928149,5.00039062 C4.20832351,4.79420381 4.42832222,4.6671875 4.66640625,4.6671875 C5.03445225,4.6671875 5.33281248,4.96554775 5.33281248,5.33359375 C5.33281248,5.70163975 5.03445225,6 4.66640625,6 Z"
                              id="形状"
                              fill={setting?.moduleType === 'carousel' ? '#006EFF' : '#D8D8D8'}
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <div>轮播</div>
                  </div>
                ),
                value: 'carousel',
              },
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      width="32px"
                      height="32px"
                      viewBox="0 0 15 15"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>全屏备份</title>
                      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g
                          id="营销推广-创建微页面图片6-1"
                          transform="translate(-1253, -196)"
                          fill={
                            setting?.moduleType === 'carousel-fullscreen' ? '#006EFF' : '#D8D8D8'
                          }
                          fillRule="nonzero"
                        >
                          <g id="全屏备份" transform="translate(1253, 196)">
                            <path
                              d="M1.17856934,2.37409584 L1.17856934,12.841723 C1.17856934,13.165466 1.28570801,13.4892091 1.5,13.7050279 C1.71429199,13.9208468 2.03570801,14.0287709 2.35713867,14.0287709 L12.75,14.0287709 C13.0714307,14.0287709 13.3928613,13.9208615 13.6071387,13.7050279 C13.821416,13.4891943 13.9285693,13.165466 13.9285693,12.841723 L13.9285693,2.37409584 C13.9285693,2.05035281 13.8214307,1.72662454 13.6071387,1.51079094 C13.3928467,1.29495734 13.0714307,1.18704792 12.75,1.18704792 L2.35713867,1.18704792 C2.03570801,1.18704792 1.71429199,1.29495734 1.5,1.51079094 C1.28570801,1.72662454 1.17856934,2.05035281 1.17856934,2.37409584 Z M0,2.37409584 C0,1.7266393 0.214291992,1.0791385 0.642861328,0.647486048 C1.07143066,0.215833601 1.71429199,0 2.35713867,0 L12.75,0 C13.3928613,0 13.9285693,0.215833601 14.3571387,0.647486048 C14.785708,1.0791385 15,1.72662454 15,2.26618641 L15,12.7338136 C15,13.3812849 14.785708,13.9208615 14.3571387,14.352514 C13.9285693,14.7841664 13.285708,15 12.75,15 L2.35713867,15 C1.71429199,15 1.17856934,14.7841664 0.75,14.352514 C0.321430664,13.9208615 0,13.3812849 0,12.7338136 L0,2.37409584 Z"
                              id="形状"
                            ></path>
                            <polygon
                              id="路径"
                              points="5.57894245 9.57894245 4 8 4 12 8 12 6.42105755 10.4210576 10.4210576 6.42105755 12 8 12 4 8 4 9.57894245 5.57894245"
                            ></polygon>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <div>全屏轮播</div>
                  </div>
                ),
                value: 'carousel-fullscreen',
              },
            ]}
          />
        </Form.Item>

        <Form.List name="pictures">
          {(fields, { add, remove }, { errors }) => {
            return (
              <div>
                <div css={css({ display: 'flex', flexDirection: 'column', gap: 20 })}>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <div
                        key={key}
                        // styles={{ body: { paddingLeft: 0, paddingTop: 30 } }}
                        css={css({ position: 'relative' })}
                      >
                        <Form.Item {...restField} label="添加图片" name={[name, 'url']} required>
                          <MaterialBtn
                            limit={2}
                            proportion={
                              setting?.data?.moduleType === 'image'
                                ? undefined
                                : setting?.data?.moduleType === 'carousel'
                                ? 1200 / 580
                                : 750 / 1500
                            }
                            extra={
                              setting?.data?.moduleType === 'image'
                                ? '支持PNG、JPG、JPEG、GIF格式，大小支持2M，建议宽度1200PX'
                                : setting?.data?.moduleType === 'carousel'
                                ? '支持PNG、JPG、JPEG、GIF格式，大小支持2M，建议尺寸1200x580PX'
                                : '支持PNG、JPG、JPEG、GIF格式，大小支持2M，建议尺寸750x1500PX'
                            }
                          />
                        </Form.Item>
                        <Form.Item {...restField} label="跳转链接" name={[name, 'link']}>
                          <WdAllocation
                            status={['poster', 'mini', 'external']}
                            onChangeData={() => {}}
                          />
                        </Form.Item>

                        {fields.length > 1 ? (
                          <Button
                            type="text"
                            css={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              zIndex: 100,
                            }}
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </div>
                    )
                  })}
                </div>
                <Form.Item
                  shouldUpdate={(prev, cur) => prev.moduleType !== cur.moduleType}
                  css={css({ marginTop: 20 })}
                >
                  {({ getFieldValue }) => {
                    const moduleType = getFieldValue('moduleType')
                    if (moduleType === 'image') {
                      return null
                    }
                    return (
                      <>
                        <Button
                          type="primary"
                          icon={<PlusCircleOutlined />}
                          css={css({
                            width: '100%',
                            height: 40,
                          })}
                          onClick={() => add()}
                        >
                          添加轮播图
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </>
                    )
                  }}
                </Form.Item>
              </div>
            )
          }}
        </Form.List>
      </Form>
    </>
  )
}

export default ImageSet
