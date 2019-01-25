export default class RangeCollection {
// class RangeCollection {
    constructor() {
        this.collection = {};
        this.memoizeCache = new Map();

        // this._generateSequence = this._memorize(this._generateSequence);
        // this._rangesToSequence = this._memorize(this._rangesToSequence.bind(this));
        // this._getUniqueInOrder = this._memorize(this._getUniqueInOrder);
    }
    /**
     * @method add - Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        if (!this._isValidRange(range)) return this;

        const rangeString = this._stringifyRange(range);

        //skip already existing range  
        if (this.collection[rangeString]) return this;

        return this._merge(range);
    }

    /**
     * @method remove - Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        if (!this._isValidRange(range)) return this;

        return this._merge(range, true);
    }

    /**
     * @method print - Prints out the list of ranges in the range collection
     * @return {String}
     */
    print() {
        const ranges = Object.keys(this.collection);

        if (!ranges.length) return '';

        return ranges
            .sort((r1, r2) => this._parseRange(r1)[0] - this._parseRange(r2)[0])
            .reduce((acc, rangeString) => acc += `${rangeString} `, '')
            .trim();
    }

    _merge(range, remove) {
        let isRangeToMergeExist = this._isIntersectionRangeExist(range);

        if (!isRangeToMergeExist) {
            //create a new range
            return this._update(range);
        }

        const collectionSequence = this._rangesToSequence(Object.keys(this.collection));

        const inputSequence = this._generateSequence(range);

        let resultSequence = this._getUniqueInOrder(collectionSequence.concat(inputSequence));

        if (remove) {
            if (inputSequence.length > 2) {
                inputSequence.shift();
            }

            inputSequence.pop();

            resultSequence = resultSequence.filter(item => !inputSequence.includes(item));
        }

        this._clear();

        this._groupItemsByRange(resultSequence)
            .map(this._update.bind(this));

        return this;
    }

    _groupItemsByRange(sequence) {
        return sequence.reduce((res, item) => {
            const lastSequence = res[res.length - 1];
            const lastItem = lastSequence[lastSequence.length - 1];

            if (!lastItem || item - lastItem === 1) {
                lastSequence.push(item);
            } else {
                res.push([item]);
            }

            return res
        }, [[]]);
    }

    _update(range) {
        this.collection[this._stringifyRange(range)] = true;
        return this;
    }

    _isIntersectionRangeExist([first, last]) {
        return Object.keys(this.collection).some(key => {
            const [begin, end] = this._parseRange(key);

            return last >= begin && end >= first;
        });
    }

    _parseRange(rangeString) {
        return rangeString.match(/[\d]+/g).map(Number);
    }

    _isValidRange(range) {
        if (!Array.isArray(range) || range.length < 2) return false;

        const [first, end] = range;

        return first !== end;
    }

    _stringifyRange(range) {
        return `[${range[0]}, ${range[range.length - 1]})`;
    }

    _getUniqueInOrder(arr) {
        return arr
            .filter((item, index, self) => index === self.indexOf(item))
            .sort((a, b) => a - b);
    }

    _generateSequence([start, end]) {
        const length = end - start + 1;
        return Array.from({ length }, (val, i) => i + start);
    }

    _clear() {
        this.collection = {};
    }

    _rangesToSequence(ranges) {
        return ranges.reduce((acc, key) =>
            acc.concat(this._generateSequence(this._parseRange(key))), []);
    }

    /** 
     * private @method _memorize - first-order memorization function
     * @return {Function}
    */
   _memorize(evaluate) {
        if (typeof evaluate !== 'function') throw new Error('Evaluation function is required');

        return input => {
            const key = `${input}`;
            const cachedValue = this.memoizeCache.get(key);

            if (cachedValue) {
                return cachedValue;
            }

            const result = evaluate(input);

            this.memoizeCache.set(key, result);

            return result;
        }
    }
}