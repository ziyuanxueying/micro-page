import { flex, flexb, TextGray9, colors } from '@global'
import useStore from '@/store'
import { TemProps } from '@/page-editor/components/ItemTemplate'

const Index = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const moduleType = current?.moduleType || '3'
  const btnColor = current?.data?.btnColor || '#718cc0'
  console.log('btnColor: ', btnColor)

  useEffect(() => {}, [current?.data])
  return (
    <>
      {moduleType === 'biz-pay-once' && (
        <div style={{ margin: '0 12px' }}>
          <div css={css([flex, { backgroundColor: '#fff', padding: 10, borderRadius: 8 }])}>
            <img
              css={css({
                width: 70,
                height: 70,
                objectFit: 'cover',
                marginRight: 10,
                borderRadius: 4,
              })}
              src="https://image-1257137391.cos.ap-beijing.myqcloud.com/images/3b993296477c364bcc68992e950c6a59.png"
            />
            <div css={css([{ flex: 1, marginTop: 14, marginLeft: 14 }])}>
              <div>1元停车 代金券</div>
              <TextGray9 css={css({ marginTop: 4 })}>无门槛使用</TextGray9>
            </div>
            <div
              css={css({
                width: 70,
                height: 25,
                border: `1px solid ${btnColor}`,
                color: `${btnColor}`,
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
      )}
      {moduleType === 'biz-pay-twice' && (
        <div style={{ margin: '0 12px' }}>
          <div css={css([flexb, { flexWrap: 'wrap', padding: '0px 6px' }])}>
            {[1, 2, 3].map(index => (
              <div
                key={index}
                css={css([
                  flex,
                  {
                    backgroundColor: '#fff',
                    padding: 6,
                    borderRadius: 4,
                    width: '49%',
                    marginBottom: 6,
                  },
                ])}
              >
                <img
                  css={css({
                    width: 70,
                    height: 70,
                    objectFit: 'cover',
                    marginRight: 10,
                    borderRadius: 4,
                  })}
                  src="https://image-1257137391.cos.ap-beijing.myqcloud.com/images/3b993296477c364bcc68992e950c6a59.png"
                />
                <div>
                  <div css={css({ color: colors.red, fontSize: 10 })}>
                    ￥<span style={{ fontSize: 20 }}>1</span>
                  </div>
                  <div
                    css={css({
                      background: '#fdece9',
                      color: colors.red,
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 2,
                      margin: '2px 0 6px',
                    })}
                  >
                    无使用门槛
                  </div>
                  <div
                    css={css({
                      width: 54,
                      height: 21,
                      border: '1px solid #718cc0',
                      color: '#718cc0',
                      borderRadius: 20,
                      fontSize: 12,
                      margin: 'auto 0',
                      textAlign: 'center',
                      lineHeight: '20px',
                    })}
                  >
                    免费领
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {moduleType === 'biz-pay-three' && (
        <div css={css([flexb, { flexWrap: 'wrap', padding: '0px 6px' }])}>
          {[1, 2, 3].map(index => (
            <div
              key={index}
              css={css([
                flex,
                {
                  backgroundColor: '#fff',
                  padding: 6,
                  borderRadius: 4,
                  width: '49%',
                  marginBottom: 6,
                },
              ])}
            >
              <img
                css={css({
                  width: 70,
                  height: 70,
                  objectFit: 'cover',
                  marginRight: 10,
                  borderRadius: 4,
                })}
                src="https://image-1257137391.cos.ap-beijing.myqcloud.com/images/3b993296477c364bcc68992e950c6a59.png"
              />
              <div>
                <div css={css({ color: colors.red, fontSize: 10 })}>
                  ￥<span style={{ fontSize: 20 }}>1</span>
                </div>
                <div
                  css={css({
                    background: '#fdece9',
                    color: colors.red,
                    fontSize: 11,
                    padding: '2px 8px',
                    borderRadius: 2,
                    margin: '2px 0 6px',
                  })}
                >
                  无使用门槛
                </div>
                <div
                  css={css({
                    width: 54,
                    height: 21,
                    border: '1px solid #718cc0',
                    color: '#718cc0',
                    borderRadius: 20,
                    fontSize: 12,
                    margin: 'auto 0',
                    textAlign: 'center',
                    lineHeight: '20px',
                  })}
                >
                  免费领
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Index
