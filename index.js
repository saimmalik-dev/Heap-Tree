class Node {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
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
        while (queue.length > 0) {
            let node = queue[front++]
            if (node.left == null) {
                node.left = newNode
                break;
            }

            if (node.right == null) {
                node.right = newNode
                break;
            }


            queue.push(node.left)
            queue.push(node.right)

        }
    }
}