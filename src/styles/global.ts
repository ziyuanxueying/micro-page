import styled from '@emotion/styled'

export const colors = {
  primary: '#0d6efd',
  success: '#198754',
  danger: '#dc3545',
  red: '#f24724',
}
export const flex = css({
  display: 'flex',
})
export const flexrc = css({
  display: 'flex',
  justifyContent: 'center',
})

export const flexc = css({
  display: 'flex',
  flexDirection: 'column',
})
export const flexcc = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

export const flexb = css({
  display: 'flex',
  justifyContent: 'space-between',
})

export const textSingle = css({
  display: 'block',
  /*设置超过的隐藏*/
  overflow: 'hidden',
  /*设置不断行*/
  whiteSpace: 'nowrap',
  /*这就是省略号喽*/
  textOverflow: 'ellipsis',
})

export const textTwice = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
})

export const textGray9 = css({
  color: '#999',
  fontSize: 12,
  lineHeight: '20px',
})

export const line = css({
  height: 1,
  background: '#ddd',
  margin: '10px 0',
})

export const Line = styled.div`
  background: #ddd;
  height: 1px;
  margin: 10px 0;
`
export const Divp = styled.div`
  padding: 8px 0px;
`

export const TextGray9 = styled.div`
  color: #999;
  font-size: 12px;
  line-height: 20px;
`

export const SetTitle = styled.div`
  font-size: 16px;
  color: #636363;
  line-height: 40px;
  margin-bottom: 10px;
`
