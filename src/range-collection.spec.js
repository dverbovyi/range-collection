import RangeCollection from './range-collection';

describe('RangeCollection', () => {
    const rc = new RangeCollection();

    test('should have defined methods', ()=> {
        const rc = new RangeCollection();
        expect(typeof rc.add).toBe('function');
        expect(typeof rc.remove).toBe('function');
        expect(typeof rc.print).toBe('function');

        expect(rc.add([])).toBe(rc);
        expect(rc.remove([])).toBe(rc);
        expect(rc.print()).toBe('');
    });

    test('rc.add([1, 5]) should display: [1, 5)', () => {
        rc.add([1, 5]);

        expect(rc.print()).toBe('[1, 5)');
    });

    test('rc.add([10, 20]) should display: [1, 5) [10, 20)', () => {
        rc.add([10, 20]);

        expect(rc.print()).toBe('[1, 5) [10, 20)');
    });

    test('rc.add([20, 20]) should display: [1, 5) [10, 20)', () => {
        rc.add([20, 20]);

        expect(rc.print()).toBe('[1, 5) [10, 20)');
    });

    test('rc.add([20, 21]) should display: [1, 5) [10, 21)', () => {
        rc.add([20, 21]);

        expect(rc.print()).toBe('[1, 5) [10, 21)');
    });

    test('rc.add([2, 4]) should display: [1, 5) [10, 21)', () => {
        rc.add([2, 4]);

        expect(rc.print()).toBe('[1, 5) [10, 21)');
    });

    test('rc.add([3, 8]) should display: [1, 8) [10, 21)', () => {
        rc.add([3, 8]);

        expect(rc.print()).toBe('[1, 8) [10, 21)');
    });

    test('rc.remove([10, 10]) should display: [1, 8) [10, 21)', () => {
        rc.remove([10, 10]);

        expect(rc.print()).toBe('[1, 8) [10, 21)');
    });

    test('rc.remove([10, 11]); should display: [1, 8) [11, 21)', () => {
        rc.remove([10, 11]);

        expect(rc.print()).toBe('[1, 8) [11, 21)');
    });

    test('rc.remove([15, 17]) should display: [1, 8) [11, 15) [17, 21)', () => {
        rc.remove([15, 17]);

        expect(rc.print()).toBe('[1, 8) [11, 15) [17, 21)');
    });

    test('rc.remove([3, 19]) should display: [1, 3) [19, 21)', () => {
        rc.remove([3, 19]);

        expect(rc.print()).toBe('[1, 3) [19, 21)');
    });
});