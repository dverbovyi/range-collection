export default class RangeCollection {
    constructor() {
        this.collection = [];
        this.sequence = [];
        this.memorizeCache = new Map();

        this._includesSubArray = this._memorize(this._includesSubArray);
        this._generateSequence = this._memorize(this._generateSequence);
        this._sequenceToRangeCollection = this._memorize(this._sequenceToRangeCollection.bind(this));
    }
    /**
     * @method add - Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        if (!this._isValidRange(range)) return this;

        const rangeSequence = this._generateSequence(range);

        const isExist = this._includesSubArray(rangeSequence, this.sequence);

        if (isExist) return this;

        this.sequence = this._getUniqueInOrder(this.sequence.concat(rangeSequence));

        return this._updateCollection();
    }

    /**
     * @method remove - Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        const hasIntersection = this._hasIntersection(range);

        if (!this._isValidRange(range) || !hasIntersection) return this;

        const rangeToRemove = this._generateSequence(range);

        this.sequence = this.sequence.filter(el => !rangeToRemove.includes(el));

        return this._updateCollection();
    }

    /**
     * @method print - Prints out the list of ranges in the range collection
     * @return {String}
     */
    print() {
        return this.collection.join(' ');
    }

    _includesSubArray(subArray, array) {
        return subArray.every(el => array.includes(el));
    }

    _hasIntersection([begin, end]) {
        const _hasIntersection = el => this.sequence.lastIndexOf(el) >= 0

        return _hasIntersection(begin) || _hasIntersection(end);
    }

    _updateCollection() {
        this.collection = this._sequenceToRangeCollection(this.sequence);

        return this;
    }

    _sequenceToRangeCollection(sequence) {
        return sequence.reduce((res, item) => {
            const lastSequence = res[res.length - 1];
            const lastItem = lastSequence[lastSequence.length - 1];

            if (!lastItem || item - lastItem === 1) {
                lastSequence.push(item);
            } else {
                res.push([item]);
            }

            return res;
        }, [[]]).map(this._stringifyRange);
    }

    _isValidRange(range) {
        if (!Array.isArray(range) || range.length < 2) return false;

        const [first, end] = range;

        return first !== end;
    }

    _stringifyRange(range) {
        const edge = range[range.length - 1] + 1;
        return `[${range[0]}, ${edge})`;
    }

    _getUniqueInOrder(arr) {
        return arr
            .filter((item, index, self) => index === self.indexOf(item))
            .sort((a, b) => a - b);
    }

    _generateSequence([start, end]) {
        const length = end - start;
        return Array.from({ length }, (val, i) => i + start);
    }

    /** 
     * @method _memorize - 2-args memorization function
     * 
     * @return {Function}
    */
    _memorize(evaluate) {
        if (typeof evaluate !== 'function') throw new Error('Evaluation function is required');

        return (...args) => {
            const [f, s] = args;
            
            let key = `${f + s}`;

            const cachedValue = this.memorizeCache.get(key);

            if (cachedValue) return cachedValue;

            const result = evaluate(...args);

            this.memorizeCache.set(key, result);

            return result;
        }
    }
}