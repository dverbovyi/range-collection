[![Build Status](https://travis-ci.org/dverbovyi/range-collection.svg?branch=master)](https://travis-ci.org/dverbovyi/range-collection) 
[![Maintainability](https://api.codeclimate.com/v1/badges/367f3a6a2d6b0bae0e53/maintainability)](https://codeclimate.com/github/dverbovyi/range-collection/maintainability)

# Range Collection

### Setup
install dev-dependencies:

	npm i

validate test-cases:

	npm test

[online demo](https://playcode.io/232450?tabs=console&script.js&output)

### Task description: 
**Implement a 'Range Collection' class.**

 A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

```js
/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {
  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    // TODO: implement this
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    // TODO: implement this
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    // TODO: implement this
  }
}

// Example run
const rc = new RangeCollection();

rc.add([1, 5]);
rc.print();
// Should display: [1, 5)

rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)

rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)

rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
```
