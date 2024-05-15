import { css } from '@emotion/react'
// todo: define global variables here
export const colors = {
  primary: '#0d6efd',
  success: '#198754',
  danger: '#dc3545',
}
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
