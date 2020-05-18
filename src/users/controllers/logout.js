
module.exports = async (req, res, next) => {
	try {
		req.logout()
		res.redirect('/users/login')
	} catch (error) {
		console.log(error)
	}
};