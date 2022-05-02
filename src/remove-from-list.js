const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
  let lastNode = null;
  let firstNode = l;
  while (l) {
    if (l.value === k) {
      if (lastNode) {
        lastNode.next = l.next;
        l.next = null;
        l = lastNode.next;
      }
      else {
        let next = l.next;
        l.next = null;
        l = next;
        firstNode = next;
      }
    } else {
      lastNode = l;
      l = l.next;
    }
  }
  return firstNode;
}

module.exports = {
  removeKFromList
};


// function convertArrayToList(arr) {
//   return arr.reverse().reduce((acc, cur) => {
//     if (acc) {
//       const node = new ListNode(cur);
//       node.next = acc;
//       return node;
//     }

//     return new ListNode(cur);
//   }, null);
// }

// function nodeToArray(node) {
//   let arr = [];
//   do {
//     arr.push(node);
//     node = node.next;
//   } while (node)
//   return arr;
// }

// const initial = convertArrayToList([1, 2, 3]);
// const arrayOfNodes = nodeToArray(initial)
// console.log(arrayOfNodes[0] === initial)

// // console.log(arrayOfNodes);
// removeKFromList(initial, 3);
// console.log(arrayOfNodes);