const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.length === 0
		? 0
		: blogs.map(b => b.likes).reduce((a, i) => a + i, 0)
}

module.exports = {
	dummy,
	totalLikes,
}
