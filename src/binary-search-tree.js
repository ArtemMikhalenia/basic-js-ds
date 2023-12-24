const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(data) {
    const newNode = new Node(data);
    (this.head === null) ? this.head = newNode : addNode(this.head, newNode);

    function addNode(node, newNode) {
      if (newNode.data < node.data) {
        (node.left === null) ? node.left = newNode : addNode(node.left, newNode);
      } else {
        (node.right === null) ? node.right = newNode : addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return searchNode(this.head, data);

    function searchNode(node, value) {
      if (!node) return false;
      if (node.data === value) return true;
      return value < node.data ? searchNode(node.left, value) : searchNode(node.right, value);
    }
  }

  find(data) {
    let currentNode = this.head;

    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return null;
  }

  remove(data) {
    this.head = removeNode(this.head, data);

    function removeNode(node, data) {
      if (node === null) {
        return null;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }
  
        if (node.left === null) {
          node = node.right;
          return node;
        } else if (node.right === null) {
          node = node.left;
          return node;
        }
  
        let minRightNode = node.right;
        while (minRightNode.left !== null) {
          minRightNode = minRightNode.left;
        }
        node.data = minRightNode.data;
        node.right = removeNode(node.right, minRightNode.data);
        return node;
      }
    }
  }

  min() {
    if (!this.head) return;
    let currentNode = this.head;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (!this.head) return;
    let currentNode = this.head;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};