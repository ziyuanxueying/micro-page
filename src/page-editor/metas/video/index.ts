import { type Component } from '@/store'

export default {
  name: '视频',
  group: '基础组件',
  icon: 'icon-video',
  metaType: 'video',
  temModule: 'VideoTem',
  setModule: 'VideoSet',
  order: 6,
  data: {
    // src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    src: 'http://xcx02-dev-1318942848.cos.ap-beijing.myqcloud.com/video_1716793955110.mp4?q-sign-algorithm=sha1&q-ak=AKIDu8KgTnzclby1_hhFI3xShGCDfmsnOLmE5O393myceMQtj1aIESqiNftrUnDgBZ9M&q-sign-time=1716793949;1716794849&q-key-time=1716793949;1716794849&q-header-list=host&q-url-param-list=&q-signature=4c86e4df16ad23c43235e13aa5b98939e5fdae1e&x-cos-security-token=2UBt20sDBQ6ArHRGn1xSolxLziRwrZua29576f6e8ecff6889c0c5e5a7d10a3acAO9flgJ6BJa3UelsT_4qAor4jysyH_Fh08ZRWW_AkAcjnRF-18-JpcSgLGqGOFpjAB3l20cgulNT8hK4HPpJSK1aGjMZkyoBXgujFLih61nOBPkJ-e2ILsyk4SMzYeCQSCTbXVfA3z9dONC_n7UYEwrECbjIoy5gMhjwsXMIEYllMFz4h1rgYb59cJKyJAh4L4A6v2OD-tN7M3MnhoZMFW9HVO_xnDf4JdxeP0rw-fRDW8mCxb9hyTgPDu-hMQDOvtg35ux-J1RhxO4W0G6GJzvFA97IqbkticNm-5PkaVLRaEpmQ2SPMAy7oREhNuaW0WVNhqqhEPnUZSHyaItDrnrA2pyN6XTPQQDN4_EjiRSnuGJKjKJmZg1tMGpdc46fx3sTuRWCL9A4U8nTXeTghK4Yozz3cn83wmsTwEUrKhBR47Ta1iXo_nR08eyIERHZkerb2wdafnZTfLMoi9oyFpxXdAkvVd8bfaVhfSGxchCCr2uV7Vd2pREBCSAHfAGDOUwjYFy-RKuUw7I98kuLAhbqklUvrBSQOli8vpdAXwMuNsJ-dk6OR36NrTlSA2SMTm5uoA3SllBWVd4a4oWjcFbR4nANHLHScDv9tIJ8Q6syaUZt9JYJfn3navtoyODY9AnjnmuYbMD53DCvJl1Gzabcaba2nopVrcXBPwjX2kubebqHpSAJf-0WafZJBLge',
  },
} as Component
