const router = require('express').Router();
const {google}= require('googleapis');

const GOOGLE_CLIENT_ID ='500600276612-edtf6kqco3sg68nd7173s0re768mf93s.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRETGOOGLE_CLIENT_SECRET='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'
const oauth2Client=new google.auth.OAuth2(
   GOOGLE_CLIENT_ID ,
   GOOGLE_CLIENT_SECRET,
   'http://localhost:3000'
)
router.get('/',async(req,res,next)=>{
    res.send({message:'It is working'});
});

router.post('/create-tokens',async(req,res,next)=>{
    try{
        const{code}=req.body
        const response=await oauth2Client.getToken(code)
        res.send(response)
    }catch(error){
        next(error)
    }
}
)

module.exports=router;