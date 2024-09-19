import { SetTitle, flexb } from '@/styles/global'
import { Avatar, Button, ColorPicker, Form, Segmented, Select } from 'antd'
import { WdModal, WdTable, WdUtils } from '@wd/component-ui'
import { ProColumnsType } from '@wd/component-ui/dist/WdTable/type'
import useStore from '@/store'
import { getCoupons } from '@/api'
import { toHexString } from '@/utils'

type dataType = {
  id: number
  couponName: string
  title: string
  no: number
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

  const propsTable: any = {
    // 传递给 Modal 组件的属性和方法
    title: '选择券',
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
    width: 870,
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
    {
      dataIndex: 'no',
      align: 'left',
      hideInTable: true,
      searchType: 'input',
      searchAttrs: { placeholder: '请输入券ID', type: 'number' },
    },
    {
      dataIndex: 'title',
      align: 'left',
      hideInTable: true,
      searchType: 'input',
      searchAttrs: { placeholder: '请输入券名称' },
    },
    { title: '券ID', dataIndex: 'no', align: 'left' },
    { title: '券名称', dataIndex: 'title', align: 'left' },
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
      render: (reacord: any) => WdUtils.couponValidRelativeHour(reacord),
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
        provideScenes: searchValue.provideScenes || setting?.data?.provideScenes,
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
    onSelect: (record: any, selected: boolean) => {
      if (selected) {
        setSelectedRows([...selectedRows, record])
      } else {
        setSelectedRows(
          selectedRows.filter((item: any) => {
            return item.no != record.no
          }),
        )
      }
    },
    onSelectAll: (selected: any, _allRows: any, changeRows: any) => {
      if (selected) {
        setSelectedRows([...selectedRows, ...changeRows])
      } else {
        const map = changeRows.map((item: any) => item.no)
        setSelectedRows(
          selectedRows.filter((item: any) => {
            return !map.includes(item.no)
          }),
        )
      }
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
      <SetTitle>免费优惠券</SetTitle>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onValuesChange={(_, allValues) => {
          allValues.provideScenes !== setting?.data?.provideScenes &&
            handleSearch({ current: 1, pageSize: 10, provideScenes: allValues.provideScenes })
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
          <Select>
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
          <div className="setting-table wd-micro-setting-table">
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
        <div className="wd-micro-modal-table">
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
        </div>
      </WdModal>
    </div>
  )
}

export default Index
