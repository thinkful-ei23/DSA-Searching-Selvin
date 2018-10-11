class BinarySearchTree {
  constructor (key=null, value=null, parent=null){
    this.key = key;
    this.value=value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
    //   console.log('creating new root with key -', key);

      this.key = key;
      this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left === null) {
        // console.log('creating new left BST with key -', key,' | parent = ', this);
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        // console.log('inserting new left node with key -', key);
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right === null) {
        // console.log('creating new right BST with key -', key,' | parent = ', this);
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        // console.log('inserting new right node with key -', key);
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
  //if the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  preOrder(nodeArr) {
    // 1) Return the root node value.
    // 2) Traverse the left subtree by recursively calling the pre-order function.
    // 3) Traverse the right subtree by recursively calling the pre-order function.

    nodeArr.push(this.key);
    if (this.left) {
      nodeArr = this.left.preOrder(nodeArr);
    }
    if (this.right) {
      nodeArr = this.right.preOrder(nodeArr);
    }
    return nodeArr;
  }
  inOrder(nodeArr ) {
    // 1) Traverse the left subtree by recursively calling the pre-order function.
    // 2) Return the root node value. 
    // 3) Traverse the right subtree by recursively calling the pre-order function.
    if (this.left) {
      nodeArr = this.left.inOrder(nodeArr);
    }    
    nodeArr.push(this.key);
    if (this.right ) {
      nodeArr = this.right.inOrder(nodeArr);
    }
    return nodeArr;
  }
  postOrder(nodeArr ) {
    // 1) Traverse the left subtree by recursively calling the pre-order function.
    // 2) Traverse the right subtree by recursively calling the pre-order function.
    // 3) Return the root node value.
    if (this.left) {
      nodeArr = this.left.postOrder(nodeArr);
    }
    if (this.right) {
      nodeArr = this.right.postOrder(nodeArr);
    }
    nodeArr.push(this.key);
    return nodeArr;
  }
  

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}
 
module.exports = BinarySearchTree;