import { en } from "./en";

export const zh: typeof en = {
  name: "S3",
  description: "支持 AWS S3 以及支持 S3 协议的对象存储服务",
  skRequiredMessage: "请输入 SecretKey",
  akRequiredMessage: "请输入 AccessKey",
  endpointUrlTooltip: "S3 协议兼容的对象存储服务",
  bucket: "存储桶",
  region: "区域",
  returnSignedUrl: "返回文件签名地址",
  actions: "方法",
  prefix: "前缀",
  delimiter: "分隔符",
  limit: "最大文件数",
  fileName: "文件名",
  dataType: "数据类型",
  data: "数据",
  messages: {
    bucketRequired: "Bucket is required",
  },
  actionName: {
    listBuckets: "查询桶列表",
    listObjects: "获取文件列表",
    uploadFile: "上传文件",
    readFile: "读取文件",
    deleteFile: "删除文件",
  },
};
