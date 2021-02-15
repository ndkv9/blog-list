const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.length === 0
		? 0
		: blogs.map(b => b.likes).reduce((a, i) => a + i, 0)
}

const favoriteBlog = blogs => {
	return blogs.length === 0
		? null
		: blogs.find(b => b.likes === Math.max(...blogs.map(b => b.likes)))
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
}
