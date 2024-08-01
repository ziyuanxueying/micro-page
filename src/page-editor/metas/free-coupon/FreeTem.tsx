import { flex, flexb, TextGray9, colors } from '@global'
import useStore from '@/store'
import { TemProps } from '@/page-editor/components/ItemTemplate'
import { defaultImage } from '@/utils'

const Index = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)
  const moduleType = current?.moduleType || 'biz-free-once'
  const btnColor = current?.data?.btnColor || '#f24724'
  const coupons = current?.data?.coupons || []

  useEffect(() => {}, [current?.data])
  return (
    <>
      {moduleType === 'biz-free-once' && (
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
                    src={defaultImage}
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
                      border: `1px solid ${btnColor}`,
                      color: `${btnColor}`,
                      borderRadius: 20,
                      fontSize: 14,
                      margin: 'auto 23px auto 0',
                      textAlign: 'center',
                      lineHeight: '25px',
                    })}
                  >
                    免费领
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {moduleType === 'biz-free-twice' && (
        <div css={css({ width: 350 })}>
          <div css={css([flexb, { flexWrap: 'wrap' }])}>
            {(coupons.length ? coupons : [0, 1]).map((v: any, index: number) => (
              <div
                key={index}
                css={css([
                  flex,
                  {
                    backgroundColor: '#fff',
                    marginRight: index % 2 == 0 ? 10 : 0,
                    borderRadius: 4,
                    width: 170,
                    height: 73,
                    marginBottom: coupons.length > 2 && index < coupons.length - 2 ? 10 : 0,
                  },
                ])}
              >
                <img
                  css={css({
                    width: 58,
                    height: 58,
                    objectFit: 'cover',
                    borderRadius: 4,
                    margin: 7,
                  })}
                  src={defaultImage}
                />
                <div>
                  <div
                    css={css({
                      color: colors.red,
                      fontSize: 14,
                      lineHeight: '18px',
                      marginTop: 10,
                    })}
                  >
                    ￥<span style={{ fontSize: 23 }}>1</span>
                  </div>
                  <div
                    css={css({
                      fontSize: 10,
                      color: '#878787',
                    })}
                  >
                    无使用门槛
                  </div>
                  <div
                    css={css({
                      width: 55,
                      height: 20,
                      border: '1px solid #7791C3',
                      borderColor: btnColor,
                      color: btnColor,
                      borderRadius: 10,
                      fontSize: 11,
                      margin: 'auto 0',
                      lineHeight: '20px',
                      textAlign: 'center',
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
                    height: 193,
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
                  src={defaultImage}
                />
                <div css={css({ display: 'flex', alignItems: 'center', flexDirection: 'column' })}>
                  <div css={css({ color: colors.red, fontSize: 14, lineHeight: '20px' })}>
                    ￥<span style={{ fontSize: 19 }}>1</span>
                  </div>
                  <div
                    css={css({
                      color: '#878787',
                      fontSize: 12,
                      lineHeight: '17px',
                      padding: '2px 8px',
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
