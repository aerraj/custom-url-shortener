const jwt = require('jsonwebtoken');
const secret="2112300@rajat";
function setUser( user) {
// try{
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,

  },secret);
// }
// catch(err){
//   console.log(err);
// }
}

function getUser(token) {
  if(!token) return null;
  console.log(jwt.verify(token, secret));
  return jwt.verify(token,secret);
}

module.exports = { setUser, getUser, }