import { SetTitle, flexb } from '@/styles/global'
import { Avatar, Button, ColorPicker, Form, Segmented } from 'antd'
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
  no: string
}
const Index = () => {
  const { selectedComponentId, components, updateComponent, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)

  const [moduleType, setModuleType] = useState(setting?.moduleType || '1')
  const [showTable, setShowTable] = useState(false)
  const [list, setList] = useState({ list: [], page: { total: 1 } }) //数据
  const [tags, setTags] = useState<dataType[]>(setting?.data?.coupons || [])
  const [selectedRows, setSelectedRows] = useState<dataType[]>(setting?.data?.coupons || [])
  const [initialValues] = useState<Record<string, any>>(setting?.data || {})

  const onChange = (val: string) => {
    setModuleType(val)
    setting &&
      updateComponent(setting.id, {
        ...setting,
        data: { ...setting.data, moduleType: val },
        moduleType: val,
      })
  }
  const propsTable: WdModalProps['modalProps'] = {
    // 传递给 Modal 组件的属性和方法
    title: '选择券',
    okText: '确定',
    size: 'large',
    cancelText: '取消',
    styles: {
      footer: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    onOk: () => {
      setShowTable(false)
      setTags(selectedRows)
    },
    onCancel: () => {
      setShowTable(false)
      setTags(tags)
      setSelectedRows(tags)
    },
  }
  const columns: ProColumnsType = [
    { title: '券ID', dataIndex: 'no', align: 'center', searchType: 'input' },
    { title: '券名称', dataIndex: 'title', searchType: 'input' },
    {
      title: '券面值',
      dataIndex: 'value',
      render: (text: string) => `${(parseInt(text) / 100).toFixed(2)}元`,
    },
    {
      title: '核销有效期',
      dataIndex: 'provideStartTime',
      render: (text, record) => <span>{`${record.useStartTime} 至 ${record.useEndTime}`}</span>,
    },
    {
      title: '可用库存/总库存',
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
      render: (_: any, tag: any) => {
        return (
          <Button type="link" onClick={() => handleClose(tag)}>
            删除
          </Button>
        )
      },
    },
  ]
  console.log(tagColumns)

  const handleSearch = async (searchValue: any) => {
    const data = await getCoupons({
      ...searchValue,
      saleType: 1,
      pageIndex: searchValue.current,
      statuses: '1,2',
    })
    setList({ list: data.list, page: { total: data.totalSize } })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])
  const rowSelection = {
    selectedRowKeys: selectedRows.map(item => item.no),
    onChange: (_selectedRowKeys: React.Key[], selectedRows: dataType[]) => {
      setSelectedRows(selectedRows as dataType[])
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
  return (
    <div>
      <SetTitle>付费优惠券</SetTitle>
      <Form
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
        <Form.Item label="选择样式" name="moduleType">
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
                value: 'biz-pay-once',
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
                value: 'biz-pay-twice',
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
                value: 'biz-pay-three',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="选择券" name="coupons" rules={[{ required: true }]}>
          <div css={css([flexb, { flexWrap: 'wrap' }])}>
            <Button type="link" onClick={() => setShowTable(true)}>
              选择券
            </Button>
            <Button type="link" onClick={() => clearSelection()}>
              清除
            </Button>
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
          loading={false}
          data={list}
          columns={columns}
          rowKey="no"
          style={{ minHeight: '0' }}
          rowSelection={{ ...rowSelection }}
          onParamsChange={handleSearch}
        ></WdTable>
      </WdModal>
    </div>
  )
}

export default Index
