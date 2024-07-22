import useStore from '@/store'
import { Line, flexb } from '@/styles/global'
import { WdModal, WdTable } from '@wd/component-ui'
import { WdModalProps } from '@wd/component-ui/dist/WdModal/type'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import { Button, Space, Tag } from 'antd'
import { getActivityList } from '@/api'
type DataType = {
  actId: number
  actTitle: string
}
const Index = () => {
  const { selectedComponentId, components, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [showTable, setShowTable] = useState(false)
  const [list, setList] = useState({ list: [], page: { total: 1 } }) //数据
  const [tags, setTags] = useState<DataType[]>(
    setting?.data?.activity?.actId ? [setting?.data?.activity] : [],
  )
  const [selectedRows, setSelectedRows] = useState<DataType[]>([setting?.data?.activity] || [])

  const propsTable: WdModalProps['modalProps'] = {
    // 传递给 Modal 组件的属性和方法
    title: '选择活动',
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
    },
  }
  const columns: ProColumnsType = [
    { title: '活动ID', dataIndex: 'actId', align: 'center' },
    { title: '活动名称', dataIndex: 'actTitle', searchType: 'input' },
    {
      title: '活动时间',
      dataIndex: 'provideStartTime',
      render: (_text, record) => <span>{`${record.actStartAt} 至 ${record.actEndAt}`}</span>,
    },
    {
      title: '剩余奖品数/奖品总数',
      dataIndex: 'totalStock',
      render: (_text, record) => <span>{`${record.totalStock} / ${record.totalStock}`}</span>,
    },
    {
      title: '参与次数',
      dataIndex: 'joinNum',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => <span>{text === 4 ? '待开始' : text === 5 ? '进行中' : ''}</span>,
    },
  ]
  const rowSelection = {
    selectedRowKeys: selectedRows.map(item => item?.actId),
    onChange: (_selKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRows(selectedRows)
    },
  }

  const handleSearch = async (searchValue: any) => {
    const res = await getActivityList({
      pageIndex: searchValue.current,
      ...searchValue,
      payload: { style: 0, isCover: 1, aStatus: '4,5', actTitle: searchValue.actTitle },
    })
    setList({ list: res.data, page: { total: res.totalCount } })
  }
  useEffect(() => {
    console.log('selectedRows: ', selectedRows[0])
    setting && updateComponentData(setting.id, { ...setting.data, activity: selectedRows[0] })
    console.log('tags: ', tags)
  }, [tags])

  const handleClose = (removedTag: DataType) => {
    const newTags = tags.filter(tag => tag !== removedTag)
    setTags(newTags)
    setSelectedRows(newTags)
  }

  return (
    <>
      <div css={css({ fontSize: 16 })}>红包雨</div>
      <Line />
      <div css={css([flexb, { flexWrap: 'wrap', margin: '10px 0' }])}>
        <Button onClick={() => setShowTable(true)}>选择活动</Button>
        <Button onClick={() => setTags([])}>清除</Button>
      </div>
      {tags.length > 0 && (
        <Space css={css({ flexWrap: 'wrap', fontSize: 13 })}>
          {tags.map(tag => (
            <Tag
              css={css({ fontSize: 13 })}
              key={tag.actId}
              closable
              color="blue"
              onClose={() => handleClose(tag)}
            >
              {tag.actTitle}
            </Tag>
          ))}
        </Space>
      )}

      <WdModal open={showTable} modalProps={propsTable}>
        <WdTable
          loading={false}
          data={list}
          columns={columns}
          rowKey="actId"
          rowSelection={{ ...rowSelection, type: 'radio' }}
          onParamsChange={handleSearch}
        ></WdTable>
      </WdModal>
    </>
  )
}

export default Index