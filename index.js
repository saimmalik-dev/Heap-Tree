class Node {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
        this.parent = null; // we have to add parent this pointer. Because, when heapify up we have to move up in the tree from leaf node 
    }
}


class MaxHeapTree {
    constructor(root) {
        this.root = new Node(root);
        this.length = 1;
    }

    insert(value) {

        let newNode = new Node(value)

        let queue = [this.root]
        let front = 0
        while (front < queue.length) {
            let node = queue[front++]
            if (node.left == null) {
                newNode.parent = node;
                node.left = newNode
                break;
            }

            if (node.right == null) {
                newNode.parent = node;
                node.right = newNode
                break;
            }


            queue.push(node.left)
            queue.push(node.right)

        }

        this.length = this.length + 1
        this.heapifyUp(newNode)

    }
    heapifyUp(node) {
        let currNode = node;
        while (currNode.parent != null) {
            if (currNode.val > currNode.parent.val) {
                let pNodeValue = currNode.parent.val;
                currNode.parent.val = currNode.val;
                currNode.val = pNodeValue;
            } else {
                // we break the loop when condition is false i.e we dont have any nodes the have "child > parent". 
                break;
            }
            currNode = currNode.parent;
        }


        // if (!node) return;
        // if (node.val > node.parent.val) {
        //     let pNode = node.parent;
        //     node.parent = node;
        //     node = pNode;
        // }
        // heapifyUp(node.)

    }

    heapifyDown(node) {
        let currNode = node;
        while (currNode.left || currNode.right) {
            // Initially select an existing child
            let selectedChild = currNode.left || currNode.right;

            // If both children exist, select the larger one
            if (
                currNode.left &&
                currNode.right &&
                currNode.right.val > currNode.left.val
            ) {
                selectedChild = currNode.right;
            }

            // Stop if the heap property is already satisfied
            if (selectedChild.val <= currNode.val) {
                break;
            }

            // Swap values
            let temp = currNode.val;
            currNode.val = selectedChild.val;
            selectedChild.val = temp;

            // Continue downward from the child
            currNode = selectedChild;


        }

    }

    extractMax() {
        if (this.isEmpty()) return null;
        let maxValue = this.root.val;
        if (this.length === 1) {
            this.root = null;
            this.length = 0;
            return maxValue;
        }

        let lastNode;
        let queue = [this.root]
        let front = 0
        while (front < queue.length) {
            let node = queue[front++]
            // console.log("node", node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            lastNode = node;
        }

        this.root.val = lastNode.val;
        if (lastNode.parent.left === lastNode) {
            lastNode.parent.left = null;
        } else {
            lastNode.parent.right = null;
        }

        this.length--;
        this.heapifyDown(this.root)

        return maxValue
    }

    bfs() {
        console.log("BFS: STARTED");
        let res = []
        let queue = [this.root]
        let front = 0
        while (front < queue.length) {
            let node = queue[front++]
            // console.log("node", node);

            res.push(node.val)
            if (node.left) {
                queue.push(node.left)
            }

            if (node.right) {
                queue.push(node.right)
            }
        }
        console.log("Max-Heap BFS:", res);
        return res;
    }

    peek() {
        return this.root ? this.root.val : null;
    }


    size() {
        return this.length

    }
    isEmpty() {
        return this.length === 0;
    }


}


const heap = new MaxHeapTree(14);
heap.insert(24)
heap.insert(12)
heap.insert(11)
heap.insert(25)
heap.insert(8)
// heap.insert(35)
heap.bfs()

console.log("Heap tree:", heap);
