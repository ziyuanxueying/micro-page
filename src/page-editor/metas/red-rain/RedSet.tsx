import useStore from '@/store'
import { Line, flexb } from '@/styles/global'
import { WdModal, WdTable } from '@wd/component-ui'
import { WdModalProps } from '@wd/component-ui/dist/WdModal/type'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import { Button, Space, Tag } from 'antd'
import { getActivityList } from '@/api'
type DataType = {
  id: number
  couponName: string
  title: string
  no: string
}
const Index = () => {
  const { selectedComponentId, components } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [showTable, setShowTable] = useState(false)
  const [list, setList] = useState({ list: [], page: { total: 1 } }) //数据
  const [tags, setTags] = useState<DataType[]>(setting?.data?.coupons || [])

  const propsTable: WdModalProps['modalProps'] = {
    // 传递给 Modal 组件的属性和方法
    title: '选择活动',
    okText: '确定',
    size: 'large',
    cancelText: '取消',
    onOk: () => {
      setShowTable(false)
      // setTags(selectedRows)
    },
    onCancel: () => {
      setShowTable(false)
      setTags(tags)
    },
  }
  const columns: ProColumnsType = [
    { title: '活动ID', dataIndex: 'actId', align: 'center', searchType: 'input' },
    { title: '券名称', dataIndex: 'actTitle', searchType: 'input' },
    { title: '发放时间', dataIndex: 'provideStartTime' },
    { title: '失效时间', dataIndex: 'provideEndTime' },
    { title: '投放库存', dataIndex: 'totalNum' },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
  }

  const handleSearch = async (searchValue: any) => {
    console.log('searchValue: ', searchValue)
    // const data2 = {
    //   // actEndAt: '',
    //   // actId: 0,
    //   // actStartAt: '',
    //   // actTitle: '',
    //   // area: '',
    //   // center: '',
    //   // group: '',
    //   // plaza: '',
    //   style: 0,
    // }
    const data = await getActivityList({ pageIndex: 1, pageSize: 10, payload: { style: 0 } })
    console.log('data: ', data)
    setList({ list: data.list, page: { total: data.totalSize } })
  }

  return (
    <>
      <div css={css({ fontSize: 16 })}>红包雨</div>
      <Line />
      <div css={css([flexb, { flexWrap: 'wrap', margin: '10px 0' }])}>
        <Button onClick={() => setShowTable(true)}>选择券</Button>
        <Button onClick={() => setTags([])}>清除</Button>
      </div>
      {tags.length > 0 && (
        <Space css={css({ flexWrap: 'wrap', fontSize: 13 })}>
          {tags.map(tag => (
            <Tag css={css({ fontSize: 13 })} key={tag.no} closable color="blue">
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
          rowSelection={{ ...rowSelection, type: 'radio' }}
          onParamsChange={handleSearch}
        ></WdTable>
      </WdModal>
    </>
  )
}

export default Index
