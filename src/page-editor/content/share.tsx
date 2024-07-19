import React from 'react'
import useStore from '@/store'

export const ShareModal: React.FC = function () {
  const { pageConfig } = useStore()
  return (
    <div
      css={css({
        position: 'absolute',
        margin: 'auto',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '300px',
        height: '525px',
        background: '#ffffff',
        borderRadius: '10px',
        overflow: 'hidden',
      })}
    >
      <img
        css={css({
          width: '300px',
          height: '440px',
        })}
        src={pageConfig.posterImage}
        title=""
        alt=""
      />
      <div>
        <div
          css={css({
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            marginLeft: '12px',
            marginTop: '10px',
            display: 'inline-block',
            backgroundColor: '#999',
          })}
        ></div>

        <div
          css={css({
            fontSize: '12px',
            display: 'inline-block',
            width: '100px',
            marginTop: '12px',
            marginLeft: '10px',
            fontWeight: 'bold',
            verticalAlign: 'top',
          })}
        >
          微信昵称
        </div>

        <div
          css={css({
            width: '56px',
            height: '56px',
            background: '#999',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px',
            marginTop: '12px',
            position: 'absolute',
            right: '12px',
          })}
        >
          二维码
        </div>
      </div>
    </div>
  )
}
