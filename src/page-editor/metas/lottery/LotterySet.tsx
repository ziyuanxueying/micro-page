import useStore from '@/store'
import { SetTitle, flexb } from '@/styles/global'
import { WdModal, WdTable, WdMaterial, ImagePreview } from '@wd/component-ui'
import { WdModalProps } from '@wd/component-ui/dist/WdModal/type'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import { Button, Form, Space, Tag } from 'antd'
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
  const [tags, setTags] = useState<DataType[]>(setting?.data?.activity || {})
  const [selectedRows, setSelectedRows] = useState<DataType[]>([setting?.data?.activity] || [])
  const [isOpen, setIsOpen] = useState(false)
  const [imgData, setImgData] = useState([])
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
    setList({ list: res.data, page: { total: res.totalSize } })
  }
  useEffect(() => {
    setting && updateComponentData(setting.id, { ...setting.data, activity: selectedRows[0] })
  }, [tags])

  const handleClose = (removedTag: DataType) => {
    const newTags = tags.filter(tag => tag !== removedTag)
    setTags(newTags)
    setSelectedRows(newTags)
  }
  const handleCancel = () => {
    setIsOpen(false)
  }
  const handleDelete = () => {
    console.log(1111111)
    setImgData([])
  }
  const handleOk = (url?: string) => {
    setImgData([{ src: url || '', name: '抽奖图片' }])
    setIsOpen(false)
  }
  return (
    <>
      <SetTitle>抽奖活动</SetTitle>
      <Form name="basic" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="添加图片" name="img" rules={[{ required: true }]}>
          <div css={css([flexb, { flexWrap: 'wrap' }])}>
            <Button type="link" onClick={() => setShowTable(true)}>
              选择活动
            </Button>
            <Button type="link" onClick={() => setTags([])}>
              清除
            </Button>
          </div>
        </Form.Item>
        <Form.Item label="活动配置" name="activity" rules={[{ required: true }]}>
          <div css={css([flexb, { flexWrap: 'wrap' }])}>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              素材库
            </Button>
            <WdMaterial
              limit={1}
              maxCount={1}
              disabled={false}
              noValidate={false}
              open={isOpen}
              onCancel={handleCancel}
              onOk={handleOk}
            />
            {imgData.length > 0 && (
              <ImagePreview
                data={imgData}
                width={200}
                height={200}
                colNum={1}
                isDefault={false}
                onDelete={handleDelete}
              />
            )}
          </div>
        </Form.Item>
      </Form>
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
