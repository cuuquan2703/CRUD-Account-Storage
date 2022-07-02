
const jwt = require('jsonwebtoken')

//@ check token user send from req.header('Authorized')
//@ Format: 'Bearer <token>'
//jwt.verify()
const verifyToken = (req,res,next)=>{
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[0]
	console.log("token request",token)
	//@ check if missing token
	if (!token)
		return res.status(401).json({
			success:false,
			message:'Token not found'
		})
	console.log(token)
	try {
		const decoded = jwt.verify(token,process.env.SIGN)
		const de = jwt.decode(token,process.env.SIGN)
		console.log("This is decoded:",de)
		req.userId = decoded.userId
		next()
	}catch(error){
		console.log(error.message)
		res.status(403).json({
			success:false,
			message:'Invalid Token'
		})
	}
} 

module.exports = verifyToken
