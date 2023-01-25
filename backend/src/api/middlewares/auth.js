const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

function genToken(params){
  return jwt.sign(params, jwtSecret, {
    expiresIn: 86400,
  })
}

function verify(token, callback, errCallback){
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(err)
      return errCallback()
    
    return callback(decoded)
  })
}

function authMiddleware(req, res, next){
  const { authorization } = req.headers
  
  if(!authorization)
    return res.status(401).json({err: 'no token'})
    
  const parts = authorization.split(' ')

  if(parts.length !== 2)
    return res.status(401).json({err: 'token error'})
    
  const [scheme, token] = parts
  
  if(!/^Bearer$/i.test(scheme))
    return res.status(401).json({err: 'unbearable'})
  
  return verify(token,
    decoded => {
      req.userId = decoded.id
      return next()
    },
    () => (
      res.status(401).json({err: 'token invalid'})
    )
  )
}

function WSmiddleware(socket, next){
  const { token } = socket.handshake.auth

  
  const [prefix, content] = token.split(' ')

  if (prefix !== 'Bearer') return socket.emit('auth:error', 'invalid prefix')

  return verify(content,
    decoded => {
      socket.userId = decoded.id
      return next()
    },
    () => {
      console.log('aaaa')
      return socket.emit('auth:error', 'invalid token')
    }
  )
}

module.exports = { genToken, authMiddleware, WSmiddleware }