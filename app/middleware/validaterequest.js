module.exports=(req,res,next)=>{
console.log('inside middle')
next();
};