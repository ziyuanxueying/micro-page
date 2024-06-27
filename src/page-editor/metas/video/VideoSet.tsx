import useStore from '@/store'
import { Divider, Form, Typography } from 'antd'
import { WdUploadVideo, WdUploadPicture } from '@wd/component-ui'
import { toComponentUrl } from '@/utils'

const { Title } = Typography

const VideoSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()
  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const { videoUrl, posterUrl } = selectedComponent?.data || {}

  const videoList = videoUrl ? [{ url: videoUrl }] : []
  const posterList = posterUrl ? [{ url: posterUrl }] : []

  console.log({ videoList, posterList })

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        标题文本
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            videoUrl: toComponentUrl(allValues.videoUrl),
            posterUrl: toComponentUrl(allValues.posterUrl),
          })
        }}
      >
        <Form.Item label="视频" name="videoUrl" required>
          <WdUploadVideo
            url="/xapi-pc-web/file/tmpSecret"
            cosType="QD"
            fileList={videoList}
            path="wxxcx/img"
            accept="video/mp4"
            multiple={false}
            maxCount={1}
            limit={10}
            proportion={0}
          />
        </Form.Item>
        <Form.Item label="封面图" name="posterUrl">
          <WdUploadPicture
            url="/xapi-pc-web/file/tmpSecret"
            cosType="QD"
            fileList={posterList}
            path="wxxcx/img"
            multiple={false}
            maxCount={1}
            theme="drag"
            defaultTip="更换图片"
            width={100}
            height={100}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default VideoSet
