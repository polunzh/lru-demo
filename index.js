class DLinkedNode {
  constructor(value = null) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor({ maxSize = 3 } = {}) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.head.prev = this.head;
  }

  get(key) {
    const node = this.cache.get(key);
    if (node) {
      return node.value;
    }

    return null;
  }

  set(key) {
    // 1. 如果key存在
    if (this.cache.get(key)) {
      this.moveToHead(this.cache.get(key));
    } else {
      // 插入头部
      const node = new DLinkedNode(key);
      if (this.cache.size >= this.maxSize) {
        // 删除尾部
        const tail = this.popTail();
        this.cache.delete(tail.value);
      }

      this.insertFirst(node);
      this.cache.set(key, node);
    }
  }

  /**
   *
   * @param {DLinkedNode} node
   */
  moveToHead(node) {
    this.removeNode(node);
    this.insertFirst(node);
  }

  /**
   *
   * @param {DLinkedNode} node
   */
  insertFirst(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   *
   * @param {DLinkedNode} node
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  popTail() {
    const node = this.tail.prev;
    this.removeNode(node);

    return node;
  }

  get size() {
    return this.cache.size;
  }

  get top() {
    return this.head.next.value;
  }
}

module.exports = LRUCache;
