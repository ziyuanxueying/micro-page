import { flex, flexb, TextGray9, colors } from '@global'
import useStore from '@/store'
import { TemProps } from '@/page-editor/components/ItemTemplate'

const Index = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)
  const moduleType = current?.moduleType || 'biz-free-once'
  const btnColor = current?.data?.btnColor || '#f24724'
  const coupons = current?.data?.coupons || []

  useEffect(() => {}, [current?.data])
  return (
    <>
      {moduleType === 'biz-free-once' &&
        (coupons.length ? coupons : [0]).map((v: any, index: number) => {
          return (
            <div
              key={index}
              style={{
                margin: '0 12px',
                paddingBottom: index === current?.data?.coupons.length - 1 ? 10 : 0,
              }}
            >
              <div
                css={css([
                  flex,
                  { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginTop: 10 },
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
                <div css={css([{ flex: 1, marginTop: 14, marginLeft: 14 }])}>
                  <div>{v.couponName}</div>
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
          )
        })}
      {moduleType === 'biz-free-twice' && (
        <div style={{ margin: '0 12px' }}>
          <div css={css([flexb, { flexWrap: 'wrap', paddingBottom: 10 }])}>
            {(coupons.length ? coupons : [0, 1]).map((v: any, index: number) => (
              <div
                key={index}
                css={css([
                  flex,
                  {
                    backgroundColor: '#fff',
                    padding: 6,
                    borderRadius: 4,
                    width: '49%',
                    marginTop: 10,
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
                      borderColor: btnColor,
                      color: btnColor,
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
      {moduleType === 'biz-free-three' && (
        <div style={{ margin: '0 12px' }}>
          <div css={css([{ display: 'flex', flexWrap: 'wrap', paddingBottom: 10 }])}>
            {(coupons.length ? coupons : [0, 1, 2]).map((v: any, index: number) => (
              <div
                key={index}
                css={css([
                  flex,
                  {
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    padding: 6,
                    borderRadius: 4,
                    width: 110,
                    marginTop: 10,
                    marginRight: (index + 1) % 3 === 0 ? 0 : 6,
                  },
                ])}
              >
                <img
                  css={css({
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    marginRight: 10,
                    borderRadius: 4,
                  })}
                  src="https://image-1257137391.cos.ap-beijing.myqcloud.com/images/3b993296477c364bcc68992e950c6a59.png"
                />
                <div>
                  <div
                    css={css({
                      fontSize: 14,
                      marginTop: 5,
                    })}
                  >
                    优惠券名称
                  </div>
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
                      borderColor: btnColor,
                      color: btnColor,
                      borderRadius: 20,
                      fontSize: 12,
                      margin: 'auto',
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
    </>
  )
}

export default Index
