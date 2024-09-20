import useStore from '@/store'
import { SetTitle, flexb } from '@/styles/global'
import { WdModal, WdTable } from '@wd/component-ui'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import { Button, Form } from 'antd'
import { getActivityList } from '@/api'
import React from 'react'
import { TableRowSelection } from 'antd/es/table/interface'
import MaterialBtn from '@/page-editor/components/MaterialBtn'
type DataType = {
  actId: number
  actTitle: string
}
const Index = () => {
  const { selectedComponentId, components, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [showTable, setShowTable] = useState(false)
  const [list, setList] = useState({ list: [], page: { total: 1 } }) //数据
  const searchForm = useRef<any>()
  const [tags, setTags] = useState<DataType[]>(
    (setting?.data?.activity?.actId && [setting?.data?.activity]) || [],
  )
  const [selectedRows, setSelectedRows] = useState<DataType[]>(
    [setting?.data?.activity?.actId] || [],
  )

  const propsTable: any = {
    // 传递给 Modal 组件的属性和方法
    title: '选择活动',
    okText: '确定',
    size: 'middle',
    cancelText: '取消',
    okButtonProps: {
      style: { width: 90, height: 32, borderRadius: 4 },
    },
    cancelButtonProps: {
      style: { width: 90, height: 32, borderRadius: 4 },
    },
    styles: {
      body: {
        height: 500,
        overflow: 'hidden',
      },
      footer: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    destroyOnClose: true,
    width: 870,
    onOk: () => {
      // searchForm.current?.resetFields()
      setShowTable(false)
      if (!selectedRows?.length || !selectedRows[0]) return
      setTags(selectedRows)
    },
    onCancel: () => {
      // searchForm.current?.resetFields()
      setShowTable(false)
      setTags(tags)
    },
  }
  const columns: ProColumnsType = [
    {
      dataIndex: 'actId',
      align: 'center',
      searchType: 'input',
      hideInTable: true,
      searchAttrs: { placeholder: '请输入活动ID', padding: 0 },
    },
    {
      dataIndex: 'actTitle',
      searchType: 'input',
      hideInTable: true,
      searchAttrs: { placeholder: '请输入活动名称' },
    },
    { title: '活动ID', dataIndex: 'actId', align: 'left' },
    { title: '活动名称', dataIndex: 'actTitle', align: 'left' },
    {
      title: '活动时间',
      dataIndex: 'provideStartTime',
      align: 'left',
      render: (_text, record) => <span>{`${record.actStartAt} 至 ${record.actEndAt}`}</span>,
    },
    {
      title: '剩余奖品数/奖品总数',
      dataIndex: 'totalStock',
      render: (_text, record) => <span>{`${record.nowStock} / ${record.totalStock}`}</span>,
    },
    {
      title: '参与次数',
      dataIndex: 'totalSum',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => <span>{text === 4 ? '待开始' : text === 5 ? '进行中' : ''}</span>,
    },
  ]

  const rowSelection = React.useMemo<TableRowSelection<any>>(() => {
    return {
      selectedRowKeys: selectedRows?.filter(x => x?.actId).map(item => item?.actId),
      onChange: (_selKeys: React.Key[], selectedRows: DataType[]) => {
        setSelectedRows(selectedRows)
      },
      type: 'radio',
    }
  }, [selectedRows])

  const handleSearch = async (searchValue: any) => {
    console.log(searchValue)
    try {
      const res = await getActivityList({
        pageIndex: searchValue.current,
        ...searchValue,
        payload: {
          style: 1,
          aStatus: '4,5',
          actTitle: searchValue.actTitle,
          actId: searchValue.actId,
        },
      })
      setList({ list: res.data, page: { total: res.totalCount } })
    } catch (err) {
      setList({ list: [], page: { total: 0 } })
    }
  }
  useEffect(() => {
    setting && updateComponentData(setting.id, { ...setting.data, activity: tags[0] })
  }, [tags])

  const handleClose = (removedTag: DataType) => {
    const newTags = tags.filter(tag => tag !== removedTag)
    setTags(newTags)
    setSelectedRows(newTags)
  }

  /**
   * 清空选项
   */
  const clearTags = () => {
    setTags([])
    setSelectedRows([])
  }

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

  return (
    <div css={css({ marginTop: 15 })}>
      <SetTitle>抽奖活动</SetTitle>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={setting?.data}
        onValuesChange={(_, allValues: any) => {
          console.log(allValues)
          setting && updateComponentData(setting.id, { ...setting.data, img: allValues.img })
        }}
      >
        <Form.Item label="添加图片" name="img" rules={[{ required: true }]}>
          <MaterialBtn
            accept=".jpg,.png,.jpeg,.gif,.JPG,.JPEG,.PNG,.GIT"
            limit={2}
            extra="支持PNG、JPG、JPEG，GIF格式，大小支持2M，建议宽度1200PX"
          />
        </Form.Item>
        <Form.Item label="活动配置" name="activity" rules={[{ required: true }]}>
          <div css={css([flexb, { flexWrap: 'wrap', width: 290 }])}>
            <Button type="link" onClick={() => setShowTable(true)} style={{ paddingLeft: 0 }}>
              选择活动
            </Button>
            {!!tags.length && (
              <Button type="link" onClick={clearTags}>
                清除
              </Button>
            )}
          </div>
        </Form.Item>
        {tags.length > 0 && (
          <div className="wd-micro-setting-table">
            <WdTable
              loading={false}
              data={{ list: tags, page: { total: 0 } }}
              columns={tagColumns}
              rowKey="actId"
              pagination={false}
            ></WdTable>
          </div>
        )}
      </Form>

      <WdModal open={showTable} modalProps={propsTable}>
        <div className="wd-micro-modal-table">
          <WdTable
            loading={false}
            data={list}
            columns={columns}
            rowKey="actId"
            hideSpace
            searchFormInstance={searchForm}
            searchConfigs={{
              inlineBtns: true,
              inModal: true,
              formConfig: {
                labelCol: { span: 10 },
              },
            }}
            rowSelection={rowSelection}
            onParamsChange={handleSearch}
          ></WdTable>
        </div>
      </WdModal>
    </div>
  )
}

export default Index
