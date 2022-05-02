const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  root() {
    if (this.start) return this.start;
    else return null;
  }

  add(value) {
    let node = new Node(value);
    if (!this.start) this.start = node;
    else {
      let lastNode = null;
      let nodeKey = "";
      let currentNode = this.start;
      do {
        if (value > currentNode.data) {
          lastNode = currentNode;
          currentNode = currentNode.right;
          nodeKey = "right";
        } else {
          lastNode = currentNode;
          currentNode = currentNode.left;
          nodeKey = "left";
        }
      } while (currentNode);
      lastNode[nodeKey] = node;
    }
  }

  has(data) {
    let currentNode = this.start;
    while (currentNode) {
      if (currentNode.data === data) return true;
      if (currentNode.data > data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
      }
    return false;
  }

  find(data) {
    let currentNode = this.start;
    while (currentNode) {
      if (currentNode.data === data) return currentNode;
      if (currentNode.data > data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
      }
    return null;
  }

  findAncestor(data) {
    if (this.start.data === data) return [null, null]

    let prevNode = null;
    let nodeKey = "";
    let currentNode = this.start;
    while (currentNode) {
      if (currentNode.data === data) return [nodeKey, prevNode];
      
      prevNode = currentNode;
      if (currentNode.data > data) {
        currentNode = currentNode.left;
        nodeKey = "left";
      } else {
        currentNode = currentNode.right;
        nodeKey = "right"
      }
    }
    return [null, null];
  }

  findLeftMax(node) {
    let prev = null;
    while (node.right) {
        prev = node;
        node = node.right;
    }
    return [prev, node];
  }

  findRightMin(node) {
      let prev = null;
      while (node.left) {
          prev = node;
          node = node.left;
      }
      return [prev, node];
  }

  remove(data) {
    let node = this.find(data);
    if (!node) return;
    let [key, ancestorNode] = this.findAncestor(data);

    if (!node.left && !node.right) {
        if (ancestorNode) ancestorNode[key] = null;
        else this.start = null;
    }
    else if (node.left && !node.right) {
        if (ancestorNode) ancestorNode[key] = node.left;
        else this.start = this.start.left;
    }
    else if (!node.left && node.right) {
        if (ancestorNode) ancestorNode[key] = node.right;
        else this.start = this.start.right;
    }
    else {
        let [prevMaxNode, leftMaxNode] = this.findLeftMax(node.left);
        let [prevMinNode, rightMinNode] = this.findRightMin(node.right);

        if (leftMaxNode.data < rightMinNode.data) {
            node = leftMaxNode;
            if (prevMaxNode) prevMaxNode.right = null;
        } else {
            node = rightMinNode;
            if (prevMinNode) prevMinNode.left = null;
        }

        if (!ancestorNode) this.start.data = node.data;
    }
  }

  min(startNode = this.start) {
    let min = startNode.data;
    while (startNode.left) {
      startNode = startNode.left;
      min = startNode.data;
    }
    return min;
  }

  max(startNode = this.start) {
    let max = startNode.data;
    while (startNode.right) {
      startNode = startNode.right;
      max = startNode.data;
    }
    return max;
  }
}

module.exports = {
  BinarySearchTree
};