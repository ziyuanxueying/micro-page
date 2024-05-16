import { css } from '@emotion/react'
// todo: define global variables here
export const colors = {
  primary: '#0d6efd',
  success: '#198754',
  danger: '#dc3545',
  red: '#f24724',
}
export const flex = {
  display: 'flex',
  backgroundColor: '#f0f2f5',
}

export const flexColumn = css({
  display: 'flex',
  flexDirection: 'column',
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
})

export const buttonStyles = css`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`
