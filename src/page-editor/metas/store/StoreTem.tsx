import { flex, textGray9 } from '@global'
const Index = () => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '10px' }}>
      <div css={css([flex, {}])}>
        <img
          style={{ width: '56px', height: '56px' }}
          src="https://img.zcool.cn/community/0168195b333395a80121b9948c9557.jpg@1280w_1l_2o_100sh.jpg"
          alt=""
        />
        <div>
          <div>锦荷</div>
          <div css={css([textGray9, {}])}>铺位：B1-超1056,B1-超1059</div>
          <div css={css([textGray9, {}])}>铺位：B1-超1056,B1-超1059</div>
        </div>
      </div>
    </div>
  )
}

export default Index
