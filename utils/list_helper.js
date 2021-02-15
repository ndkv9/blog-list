const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.map(b => b.likes).reduce((a, i) => a + i, 0)
}

module.exports = {
	dummy,
	totalLikes,
}
