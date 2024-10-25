import { cosEnv } from '@/utils'

const Index = () => {
  return (
    <>
      <img
        css={css({
          width: 92,
          height: 100,
        })}
        src={cosEnv + '/static-wxxcx/img/micro-page/luckymoney.png?1'}
        alt=""
      />
    </>
  )
}

export default Index
