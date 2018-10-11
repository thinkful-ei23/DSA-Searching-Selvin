'use strict';
const BinarySearchTree = require('./bst-class');

function main() {
  let BST = new BinarySearchTree();
  //const InputList='EASYQUESTION';
  //const InputList=[3, 1, 4, 6, 9, 2, 5, 7];
  const InputList = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
  for(let i=0; i < InputList.length; i++) {
    // console.log('InputList[i]: ', InputList[i]);
    BST.insert(InputList[i]);
  }
  // BST.insert('E', 'Hello');
  // BST.insert('A', 'Hello');
  
console.log(BST.preOrder([]));
console.log(BST.inOrder([]));
console.log(BST.postOrder([]));
}
main();

