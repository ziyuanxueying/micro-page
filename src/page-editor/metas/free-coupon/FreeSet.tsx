import { SetTitle, flexb } from '@/styles/global'
import { Avatar, Button, ColorPicker, Form, Segmented, Select } from 'antd'
import { WdModal, WdTable } from '@wd/component-ui'
import { WdModalProps } from '@wd/component-ui/dist/WdModal/type'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import useStore from '@/store'
import { getCoupons } from '@/api'
import { toHexString } from '@/utils'
import React from 'react'
type dataType = {
  id: number
  couponName: string
  title: string
  no: number
}

function validRelativeHourHandle(validRelativeHour: any) {
  const { relativeDay, relativeHour } = _relativeHourFormatToForm(validRelativeHour)

  const strArray = []
  if (relativeDay) {
    strArray.push(`${relativeDay}天`)
  }
  if (relativeHour) {
    strArray.push(`${relativeHour}小时`)
  }
  return strArray.join('')
}

function _relativeHourFormatToForm(validRelativeHour: any) {
  let relativeDay, relativeHour
  if (!isNaN(validRelativeHour * 1)) {
    relativeDay =
      validRelativeHour % 24 === 0 ? validRelativeHour / 24 : Math.ceil(validRelativeHour / 24) - 1
    relativeHour = validRelativeHour % 24 === 0 ? 0 : validRelativeHour % 24
  }
  return {
    relativeDay,
    relativeHour,
  }
}

const Index = () => {
  const { selectedComponentId, components, updateComponent, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)

  const [moduleType, setModuleType] = useState(setting?.moduleType || '1')
  // const [channelId, setChannelId] = useState('bs_0c326a0471907632c3049ca43d434c9c')
  const [showTable, setShowTable] = useState(false)
  const [list, setList] = useState({ list: [], page: { total: 0 } }) //数据
  const [tags, setTags] = useState<dataType[]>(setting?.data?.coupons || [])
  const [selectedRows, setSelectedRows] = useState<dataType[]>(setting?.data?.coupons || [])
  const [initialValues] = useState<Record<string, any>>(setting?.data || {})
  const [channel, setChannel] = useState<number>(19)
  const [loading, setLoading] = useState<boolean>(false)

  const onChange = (val: string) => {
    setModuleType(val)
    setting &&
      updateComponent(setting.id, {
        ...setting,
        data: { ...setting.data, moduleType: val },
        moduleType: val,
      })
  }
  // const channeChange = (value: string) => {
  //   setChannelId(value)
  //   setting &&
  //     updateComponent(setting.id, { ...setting, data: { ...setting.data, channelId: value } })
  // }

  const propsTable: WdModalProps['modalProps'] = {
    // 传递给 Modal 组件的属性和方法
    title: '选择券',
    okText: '确定',
    size: 'middle',
    cancelText: '取消',
    styles: {
      footer: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    width: 658,
    // destroyOnClose: true,
    onOk: () => {
      setShowTable(false)
      setTags(selectedRows)
    },
    onCancel: () => {
      setShowTable(false)
      setTags(tags)
    },
  }
  const columns: ProColumnsType = [
    { title: '券ID', dataIndex: 'no', align: 'left', searchType: 'input' },
    { title: '券名称', dataIndex: 'title', align: 'left', searchType: 'input' },
    {
      title: '券类型',
      align: 'left',
      // dataIndex: 'type',
      render: (reacord: any) => (
        <span> {reacord?.type == 1 ? '代金券' : reacord?.type == 2 ? '兑换券' : '停车券'}</span>
      ),
    },
    // {
    //   title: '券图标',
    //   dataIndex: 'pic',
    //   render: (text: string) => (
    //     <img
    //       src={text}
    //       alt=""
    //       style={{ width: '90px', height: '60px', marginBottom: '-16px', objectFit: 'contain' }}
    //     />
    //   ),
    // },
    {
      title: '券面值',
      dataIndex: 'value',
      align: 'left',
      render: (text: string) => `${(parseInt(text) / 100).toFixed(2)}元`,
    },
    // {
    //   title: '发放主体',
    //   dataIndex: 'createOrgFullName',
    // },
    {
      title: '有效期',
      align: 'left',
      render: (reacord: any) => (
        <span>
          {' '}
          {reacord.usePeriod == 2
            ? `自领取后${reacord.expiredAfterHours}内有效${validRelativeHourHandle(
                reacord.expiredAfterHours,
              )}`
            : `${reacord.useStartTime} 至${reacord.useEndTime}`}
        </span>
      ),
    },
    {
      title: '可用库存/总库存',
      align: 'left',
      render: (_: any, values: any) => {
        return `${values.stockNum}/${values.totalNum}`
      },
    },
  ]

  const tagColumns = [
    ...columns.map((v: any) => {
      v = { ...v }
      v.searchType = undefined
      return v
    }),
    {
      title: '操作',
      fixed: 'right',
      render: (_: any, tag: any) => {
        return (
          <Button type="link" onClick={() => handleClose(tag)}>
            删除
          </Button>
        )
      },
    },
  ]

  const handleSearch = async (searchValue: any) => {
    try {
      setLoading(true)
      const data = await getCoupons({
        provideScenes: channel,
        ...searchValue,
        saleType: 0,
        pageIndex: searchValue.current,
        statuses: '1,2',
      })
      setList({ list: data.list, page: { total: data.totalSize } })
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    setModuleType(setting?.moduleType || '3')
  }, [setting])
  useEffect(() => {
    setting &&
      updateComponent(setting.id, {
        ...setting,
        isError: '',
        data: { ...setting.data, coupons: selectedRows },
      })
  }, [tags])
  const rowSelection = {
    selectedRowKeys: selectedRows.map(item => item.no),
    onChange: (_selectedRowKeys: React.Key[], selectedRows: dataType[]) => {
      setSelectedRows(selectedRows)
    },
  }
  const handleClose = (removedTag: dataType) => {
    const newTags = tags.filter(tag => tag.no !== removedTag.no)
    setTags(newTags)
    setSelectedRows(newTags)
  }

  const clearSelection = () => {
    setTags([])
    setSelectedRows([])
  }

  const changeChannel = (channel: number) => {
    setChannel(channel)
    handleSearch({ current: 1, pageSize: 10, provideScenes: channel })
  }
  return (
    <div>
      <SetTitle>免费优惠券</SetTitle>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            ...allValues,
            coupons: selectedRows,
            btnColor: toHexString(allValues.btnColor),
          })
        }}
      >
        <Form.Item label="选择样式">
          <Segmented
            value={moduleType}
            onChange={onChange}
            options={[
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar
                      shape="square"
                      src="https://xcx02-test-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/micro-page/sel-one.png"
                    />
                    <div>样式一</div>
                  </div>
                ),
                value: 'biz-free-once',
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar
                      shape="square"
                      src="https://xcx02-test-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/micro-page/sel-two.png"
                    />
                    <div>样式二</div>
                  </div>
                ),
                value: 'biz-free-twice',
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar
                      shape="square"
                      src="https://xcx02-test-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/micro-page/sel-three.png"
                    />
                    <div>样式三</div>
                  </div>
                ),
                value: 'biz-free-three',
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="券渠道" name="provideScenes">
          <Select value={channel} defaultValue={channel} onChange={changeChannel}>
            <Select.Option value={19}>好券</Select.Option>
            <Select.Option value={20}>微页面专享</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="选择券" name="coupons" rules={[{ required: true }]}>
          <div css={css([flexb, { flexWrap: 'wrap', width: 290 }])}>
            <Button type="link" onClick={() => setShowTable(true)} style={{ paddingLeft: 0 }}>
              选择券
            </Button>
            {!!tags.length && (
              <Button type="link" onClick={() => clearSelection()}>
                清除
              </Button>
            )}
          </div>
        </Form.Item>
        {!!tags.length && (
          <div className="setting-table">
            <WdTable
              loading={false}
              data={{ list: tags, page: { total: 0 } }}
              columns={tagColumns}
              rowKey="no"
              pagination={false}
            ></WdTable>
          </div>
        )}
        {/* {tags.length > 0 && (
          <Space css={css({ flexWrap: 'wrap', fontSize: 13, marginBottom: 20 })}>
            {tags.map(tag => (
              <Tag
                css={css({ fontSize: 13 })}
                key={tag.no}
                closable
                color="blue"
                onClose={() => handleClose(tag)}
              >
                {tag.couponName}
              </Tag>
            ))}
          </Space>
        )} */}

        <Form.Item label="按钮颜色" name="btnColor">
          <ColorPicker showText disabledAlpha />
        </Form.Item>
      </Form>

      <WdModal open={showTable} modalProps={propsTable}>
        <WdTable
          loading={loading}
          data={list}
          columns={columns}
          rowKey="no"
          searchConfigs={{
            inlineBtns: true,
            inModal: true,
            formConfig: {
              labelCol: { span: 10 },
            },
          }}
          hideSpace
          rowSelection={{ ...rowSelection }}
          onParamsChange={handleSearch}
        ></WdTable>
      </WdModal>
    </div>
  )
}

export default Index
