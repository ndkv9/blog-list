const listHelper = require('../utils/list_helper.js')

test('dummy returns one', () => {
	expect(listHelper.dummy([])).toBe(1)
})
