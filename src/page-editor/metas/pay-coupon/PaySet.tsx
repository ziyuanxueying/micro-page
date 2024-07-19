import { SetTitle, flexb } from '@/styles/global'
import { Avatar, Button, ColorPicker, Form, Segmented, Space, Tag } from 'antd'
import { WdModal, WdTable } from '@wd/component-ui'
import { WdModalProps } from '@wd/component-ui/dist/WdModal/type'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import useStore from '@/store'
import { getCoupons } from '@/api'
import { toHexString } from '@/utils'
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
    setting && updateComponent(setting.id, { ...setting, moduleType: val })
  }
  const propsTable: WdModalProps['modalProps'] = {
    // 传递给 Modal 组件的属性和方法
    title: '表格弹框',
    okText: '确定',
    size: 'large',
    cancelText: '取消',
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
      title: '券图标',
      dataIndex: 'pic',
      render: (text: string) => (
        <img
          src={text}
          alt=""
          style={{ width: '90px', height: '60px', marginBottom: '-16px', objectFit: 'contain' }}
        />
      ),
    },
    { title: '发放主体', dataIndex: 'createOrgFullName' },
    { title: '发放时间', dataIndex: 'provideStartTime' },
    { title: '失效时间', dataIndex: 'provideEndTime' },
    { title: '投放库存', dataIndex: 'totalNum' },
  ]

  const handleSearch = async (searchValue: any) => {
    const data = await getCoupons({ ...searchValue, saleType: 1 })
    setList({ list: data.list, page: { total: data.totalSize } })
  }

  useEffect(() => {
    setModuleType(setting?.moduleType || '3')
  }, [setting])
  useEffect(() => {
    setting &&
      updateComponent(setting.id, {
        ...setting,
        data: { ...setting.data, coupons: selectedRows },
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])
  const rowSelection = {
    selectedRowKeys: selectedRows.map(item => item.no),
    onChange: (_selectedRowKeys: React.Key[], selectedRows: dataType[]) => {
      console.log('selectedRows: ', selectedRows)
      console.log('_selectedRowKeys: ', _selectedRowKeys)
      const coupons = selectedRows.map(item => {
        return { no: item.no, couponName: item.title }
      }) as dataType[]
      setSelectedRows(coupons)
    },
  }
  const handleClose = (removedTag: dataType) => {
    const newTags = tags.filter(tag => tag !== removedTag)
    console.log('newTags: ', newTags)
    setTags(newTags)
    setSelectedRows(newTags)
  }
  return (
    <div>
      <SetTitle>付费优惠券</SetTitle>
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
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                    <div>样式一</div>
                  </div>
                ),
                value: 'biz-pay-once',
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                    <div>样式二</div>
                  </div>
                ),
                value: 'biz-pay-twice',
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar style={{ backgroundColor: '#87d068' }} />
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
            <Button type="link" onClick={() => setTags([])}>
              清除
            </Button>
          </div>
        </Form.Item>

        {tags.length > 0 && (
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
        )}

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
          rowSelection={{ ...rowSelection }}
          onParamsChange={handleSearch}
        ></WdTable>
      </WdModal>
    </div>
  )
}

export default Index
