import { flex, textGray9, colors } from '@global'
import useStore from '@/store'
const Index = () => {
  const { selectedModule } = useStore()

  const { mouldTpye = 1 } = selectedModule?.data || {}
  return (
    <>
      {mouldTpye !== 3 ? (
        <div style={{ margin: '0 12px' }}>
          <div css={css([flex, { backgroundColor: '#fff', padding: 10, borderRadius: 8 }])}>
            {mouldTpye === 1 && (
              <div
                style={{
                  width: 70,
                  height: 48,
                  textAlign: 'center',
                  fontSize: 12,
                  color: colors.red,
                  borderRight: '1px solid #f5f5f5',
                  paddingRight: 10,
                }}
              >
                <div>
                  <span style={{ fontSize: 24, lineHeight: '30px' }}>10</span> 元
                </div>
                <div>代金券</div>
              </div>
            )}
            {mouldTpye === 2 && (
              <img
                style={{ width: 48, height: 48, borderRadius: 4, marginRight: 10 }}
                src="https://img.zcool.cn/community/0168195b333395a80121b9948c9557.jpg@1280w_1l_2o_100sh.jpg"
                alt=""
              />
            )}
            <div css={css([{ flex: 1, marginTop: 6, marginLeft: 14 }])}>
              <div>肯德基10元早餐代金券</div>
              <div css={css([textGray9, {}])}>无门槛使用</div>
            </div>
            <div
              css={css({
                width: 70,
                height: 25,
                border: '1px solid #718cc0',
                color: '#718cc0',
                borderRadius: 20,
                fontSize: 14,
                margin: 'auto 0',
                textAlign: 'center',
                lineHeight: '24px',
              })}
            >
              免费领
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Index
