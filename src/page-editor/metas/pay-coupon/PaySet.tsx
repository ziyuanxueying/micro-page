import { Line, TextGray9, flexb } from '@/styles/global'
import { Button, Radio, RadioChangeEvent, Select, Space, Tag } from 'antd'
import { WdModal, WdTable } from '@wd/component-ui'
import { WdModalProps } from '@wd/component-ui/dist/WdModal/type'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import useStore from '@/store'
import { getCoupons } from '@/api'
type dataType = {
  id: number
  couponName: string
  title: string
  no: string
}
const Index = () => {
  const { selectedComponentId, components, updateComponent } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)

  const [moduleType, setModuleType] = useState(setting?.moduleType || '1')
  const [channelId, setChannelId] = useState('bs_0c326a0471907632c3049ca43d434c9c')
  const [showTable, setShowTable] = useState(false)
  const [list, setList] = useState({ list: [], page: { total: 1 } }) //数据
  const [tags, setTags] = useState<dataType[]>(setting?.data?.coupons || [])
  const [selectedRows, setSelectedRows] = useState<dataType[]>(setting?.data?.coupons || [])

  const onChange = (e: RadioChangeEvent) => {
    setModuleType(e.target.value)
    setting && updateComponent(setting.id, { ...setting, moduleType: e.target.value })
  }
  const channeChange = (value: string, option: object) => {
    console.log('option: ', option)
    console.log(`selected ${value}`)
    setChannelId(value)
    setting &&
      updateComponent(setting.id, { ...setting, data: { ...setting.data, channelId: value } })
  }

  const propsTable: WdModalProps['modalProps'] = {
    // 传递给 Modal 组件的属性和方法
    title: '表格弹框',
    okText: '确定',
    size: 'large',
    cancelText: '取消',
    styles: {
      body: { height: '700px', overflow: 'auto' },
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
    {
      title: '发放主体',
      dataIndex: 'plazaid',
      searchType: 'select',
      key: 'plazaid',
      hideInTable: true,
      option: [{ value: '1000274', label: '上海周浦万达广场' }],
    },
    { title: '券ID', dataIndex: 'no', align: 'center', searchType: 'input' },
    { title: '券名称', dataIndex: 'title', searchType: 'input' },
    { title: '发放时间', dataIndex: 'provideStartTime' },
    { title: '失效时间', dataIndex: 'provideEndTime' },
    { title: '投放库存', dataIndex: 'totalNum' },
  ]

  const handleSearch = async (searchValue: any) => {
    const data = await getCoupons(searchValue)
    setList({ list: data.records, page: { total: data.totalSize } })
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
  const options = [
    { channel: '好券', appId: 5054, channelId: 'bs_0c326a0471907632c3049ca43d434c9c' },
    { channel: '微页面专用渠道', appId: 100699, channelId: 'bs_f97fdee674c4edef793725d71a9054df' },
  ]
  return (
    <div>
      <div css={css({ fontSize: 16 })}>免费优惠券</div>
      <Line />
      <div>
        选择模板：
        <Radio.Group onChange={onChange} value={moduleType}>
          <Radio value={'biz-pay-img'}>图文</Radio>
          <Radio value={'biz-pay-memphis'}>孟菲斯风格</Radio>
          <Radio value={'biz-pay-twice'}>一行两个</Radio>
        </Radio.Group>
      </div>
      <Line />
      <div>
        选择渠道：
        <Select
          value={channelId}
          showSearch
          allowClear
          style={{ width: '200px' }}
          onChange={channeChange}
          disabled={tags.length > 0}
        >
          {options.map(item => (
            <Select.Option key={item.appId} value={item.channelId}>
              {item.channel}
            </Select.Option>
          ))}
        </Select>
        <TextGray9>*请清空列表数据后更换渠道</TextGray9>
      </div>
      <div css={css([flexb, { flexWrap: 'wrap', margin: '10px 0' }])}>
        <Button onClick={() => setShowTable(true)}>选择券</Button>
        <Button onClick={() => setTags([])}>清除</Button>
      </div>
      {tags.length > 0 && (
        <Space css={css({ flexWrap: 'wrap', fontSize: 13 })}>
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