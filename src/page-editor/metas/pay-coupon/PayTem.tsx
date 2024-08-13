import { flex, flexb, TextGray9, colors } from '@global'
import useStore from '@/store'
import { TemProps } from '@/page-editor/components/ItemTemplate'

const Index = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)
  const moduleType = current?.moduleType || 'biz-pay-once'
  const btnColor = current?.data?.btnColor || '#f24724'
  const coupons = current?.data?.coupons || []

  useEffect(() => {}, [current?.data])
  return (
    <>
      {moduleType === 'biz-pay-once' && (
        <div>
          {(coupons.length ? coupons : [0]).map((v: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  width: 350,
                  height: 88,
                  marginBottom: coupons.length > 1 && index !== coupons.length - 1 ? 10 : 0,
                }}
              >
                <div css={css([flex, { backgroundColor: '#fff', borderRadius: 8 }])}>
                  <img
                    css={css({
                      width: 66,
                      height: 66,
                      objectFit: 'cover',
                      margin: 11,
                      borderRadius: 5,
                    })}
                    src={
                      'https://image-1257137391.cos.ap-beijing.myqcloud.com/images/3b993296477c364bcc68992e950c6a59.png'
                    }
                  />
                  <div css={css([{ flex: 1, marginTop: 14, marginLeft: 14 }])}>
                    <div>优惠券名称</div>
                    <TextGray9>无使用门槛</TextGray9>
                    <div css={css({ color: colors.red, fontSize: 14, lineHeight: '24px' })}>
                      ￥<span style={{ fontSize: 23 }}>1</span>
                    </div>
                  </div>
                  <div
                    css={css({
                      width: 70,
                      height: 25,
                      backgroundColor: btnColor,
                      color: 'white',
                      borderRadius: 20,
                      fontSize: 14,
                      margin: 'auto 23px auto 0',
                      textAlign: 'center',
                      lineHeight: '24px',
                    })}
                  >
                    立即购
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {moduleType === 'biz-pay-twice' && (
        <div css={css({ width: 330 })}>
          <div css={css([flexb, { flexWrap: 'wrap' }])}>
            {(coupons.length ? coupons : [0, 1]).map((v: any, index: number) => (
              <div
                key={index}
                css={css([
                  flex,
                  {
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    padding: 6,
                    boxSizing: 'border-box',
                    borderRadius: 4,
                    width: 160,
                  },
                ])}
              >
                <img
                  css={css({
                    width: 145,
                    height: 145,
                    objectFit: 'cover',
                    borderRadius: 4,
                  })}
                  src={
                    'https://image-1257137391.cos.ap-beijing.myqcloud.com/images/3b993296477c364bcc68992e950c6a59.png'
                  }
                />
                <div>
                  <div
                    css={css({
                      marginTop: 6,
                      fontSize: 15,
                    })}
                  >
                    优惠券名称
                  </div>
                  <div
                    css={css({
                      color: '#b3b3b3',
                      fontSize: 11,
                    })}
                  >
                    无使用门槛
                  </div>
                  <div css={css({ color: colors.red, fontSize: 10 })}>
                    ￥<span style={{ fontSize: 20 }}>1</span>
                  </div>
                  <div
                    css={css({
                      width: 100,
                      height: 24,
                      background: btnColor,
                      color: '#ffffff',
                      borderRadius: 20,
                      fontSize: 12,
                      margin: 'auto',
                      textAlign: 'center',
                      lineHeight: '24px',
                    })}
                  >
                    立即购
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {moduleType === 'biz-pay-three' && (
        <div css={css({ width: 350 })}>
          <div css={css([{ display: 'flex', flexWrap: 'wrap' }])}>
            {(coupons.length ? coupons : [0, 1, 2]).map((_v: any, index: number) => (
              <div
                key={index}
                css={css([
                  flex,
                  {
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    width: 112,
                    height: 215,
                    marginRight: (index + 1) % 3 !== 0 ? 7 : 0,
                    marginBottom: coupons.length > 3 && index < coupons.length - 3 ? 10 : 0,
                  },
                ])}
              >
                <img
                  css={css({
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    margin: 6,
                    borderRadius: 4,
                  })}
                  src={
                    'https://image-1257137391.cos.ap-beijing.myqcloud.com/images/3b993296477c364bcc68992e950c6a59.png'
                  }
                />
                <div
                  css={css({
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    paddingLeft: 6,
                  })}
                >
                  <div
                    css={css({
                      marginTop: 6,
                      fontSize: 13,
                    })}
                  >
                    优惠券名称
                  </div>
                  <div
                    css={css({
                      color: '#b3b3b3',
                      fontSize: 11,
                    })}
                  >
                    无使用门槛
                  </div>
                  <div css={css({ color: colors.red, fontSize: 10 })}>
                    ￥<span style={{ fontSize: 18 }}>1</span>
                  </div>
                  <div
                    css={css({
                      width: 65,
                      height: 24,
                      background: btnColor,
                      color: '#ffffff',
                      borderRadius: 20,
                      fontSize: 12,
                      margin: 'auto',
                      textAlign: 'center',
                      lineHeight: '24px',
                    })}
                  >
                    立即购
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
