
import Quill from "quill";

const ImageBlot = Quill.import('formats/image')
// 链接：https://juejin.cn/post/6966993945973194765
export default class EmojiBlot extends ImageBlot {
  static blotName = 'emoji'; // 定义自定义Blot的名字（必须全局唯一）
  static tagName = 'img'; // 自定义内容的标签名

  // 创建自定义内容的DOM节点
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', ImageBlot.sanitize(value.url));
    if (value.width !== undefined) {
      node.setAttribute('width', value.width);
    }
    if (value.height !== undefined) {
      node.setAttribute('height', value.height);
    }
    return node;
  }

  // 返回options数据
  static value(node) {
    return {
      url: node.getAttribute('src'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height')
    };
  }
}