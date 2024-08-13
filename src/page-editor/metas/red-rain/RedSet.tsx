import useStore from '@/store'
import { SetTitle, flexb } from '@/styles/global'
import { WdModal, WdTable } from '@wd/component-ui'
import { WdModalProps } from '@wd/component-ui/dist/WdModal/type'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import { Button, Typography } from 'antd'
import { getActivityList } from '@/api'
import React from 'react'
import { TableRowSelection } from 'antd/es/table/interface'
import FormItem from 'antd/es/form/FormItem'

const { Text } = Typography

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
    size: 'middle',
    cancelText: '取消',
    styles: {
      footer: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    width: 658,
    onOk: () => {
      setShowTable(false)
      setTags(selectedRows)
    },
    onCancel: () => {
      setShowTable(false)
      // setTags(tags)
    },
  }
  const columns: ProColumnsType = [
    { title: '活动ID', dataIndex: 'actId', align: 'center', searchType: 'input' },
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
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]
  const rowSelection = React.useMemo<TableRowSelection<any>>(() => {
    return {
      selectedRowKeys: selectedRows.map(item => item?.actId),
      onChange: (_selKeys: React.Key[], selectedRows: DataType[]) => {
        setSelectedRows(selectedRows)
      },
      type: 'radio',
    }
  }, [selectedRows])

  const handleSearch = async (searchValue: any) => {
    const res = await getActivityList({
      pageIndex: searchValue.current,
      ...searchValue,
      payload: {
        style: 0,
        isCover: 1,
        aStatus: '4,5',
        actTitle: searchValue.actTitle,
        actId: searchValue.actId,
      },
    })
    setList({ list: res.data, page: { total: res.totalCount } })
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
    <>
      <SetTitle>红包雨</SetTitle>
      <div css={css([flexb, { flexWrap: 'wrap', margin: '10px 0', width: 370 }])}>
        <FormItem label="活动配置" required>
          <Button type="link" onClick={() => setShowTable(true)} style={{ paddingLeft: 0 }}>
            选择活动
          </Button>
        </FormItem>
        {!!tags.length && (
          <Button type="link" onClick={clearTags}>
            清除
          </Button>
        )}
      </div>

      {tags.length > 0 && (
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

      <Text type="secondary">
        温馨提示：红包雨组件不在用户端展示，用户打开微页面时，即在该页面触发红包雨活动。
      </Text>
      <br />
      <img
        css={css({ marginTop: 10 })}
        src="https://xcx02-test-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/micro-page/luckymoney-preview.png"
      />
      {/* {tags.length > 0 && (
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
      )} */}

      <WdModal open={showTable} modalProps={propsTable}>
        <WdTable
          loading={false}
          data={list}
          columns={columns}
          rowKey="actId"
          hideSpace
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
      </WdModal>
    </>
  )
}

export default Index
