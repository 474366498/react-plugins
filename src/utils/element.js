
// 判断节点是否是与parentNode存在直接关系(子节点或就是同一个节点)
export function nodeIsChild(node, parentNode) {
  while (node) {
    if (node == parentNode) {
      return true
    } else {
      node = node.parentNode
    }
  }
  return false
}