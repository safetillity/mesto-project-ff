function array_diff(a, b) {
	return a.filter(item => !b.includes(item))
}
console.log(array_diff([4,5,6,7],[5,6]))