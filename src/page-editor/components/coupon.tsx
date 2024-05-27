import tingche from '@/assets/tingche.png'
import zhekou from '@/assets/zhekou.png'
type PropType = {
  type: 'free' | 'pay'
}
const Index = (props: PropType) => {
  const imgUrl = props.type === 'free' ? tingche : zhekou
  return (
    <div
      css={css({
        width: 70,
        height: 70,
        background: `url(${imgUrl})`,
        backgroundSize: '80px 100%',
        backgroundPosition: 'center',
        textAlign: 'center',
        fontSize: 10,
        marginRight: 10,
        borderRadius: 4,
      })}
    >
      <div css={css({ marginTop: 6 })}>停车券</div>
      <div css={css({ marginTop: 8, letterSpacing: -2, marginLeft: -10 })}>
        ￥<span style={{ fontSize: 24 }}>1</span>
      </div>
    </div>
  )
  // return <div css={css` ${buttonStyles}; font-size: 18px;`)}>www</div>
  // return  <div css={css([flexColumn, { width: '50%' }])}>www</div>
}

export default Index
