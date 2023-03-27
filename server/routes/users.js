require('dotenv').config()

var express = require('express');
var router = express.Router();
const {google} = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const Client_ID = process.env.CLIENT_ID
const Client_Secret = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

// const oauth2Client = new google.auth.OAuth2(
//   Client_ID,
//   Client_Secret,
//   'http://localhost:8000/users/google/redirect'
// )

const calendar = google.calendar({
  version:'v3',
  auth: process.env.API
})

const scopes =['https://www.googleapis.com/auth/calendar']

const authClient = new OAuth2Client(Client_ID, Client_Secret, REDIRECT_URI);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/google', async(req,res,next)=>{
  try{
    const url = authClient.generateAuthUrl({
      access_type:"offline",
      scope:scopes
    });
    console.log('url',url);
    res.redirect(url);
  }
  catch(err){
    next(err)
  }
})

router.get('/google/redirect', (req,res)=>{
  const code = req.query.code;
  console.log('code',code)

  const {tokens} = authClient.getToken(code)
  console.log('token',tokens)
    
  // console.log('Access token:', tokens.access_token);
  // console.log('Refresh token:', tokens.refresh_token);

  // });
  // console.log(oauth2Client.getToken(code))
  // const authClient = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  // const {tokens} = oauth2Client.getToken(code);
  // console.log('tokens',tokens);
  // oauth2Client.setCredentials(tokens);

  res.send("you have successfully logged in");
});

router.get('/schedule_event',(req,res)=>{
  
  console.log(authClient.credentials.access_token)
  calendar.events.insert({
    calendarId:"primary",
    auth: authClient,
    requestBody:{
      summary:"This is a test event",
      description:"Some event",
      start:{
        dateTime:'2023-03-27',
        timeZone:"Asia/Kolkata"
      },
      end:{
        dateTime: '2023-03-28',
        timeZone:"Asia/Kolkata"
      }
    }
  })
})

router.post('/create-event', async (req,res, next)=>{
  try{
    const{summary,desc,location,startDate,endDate} = req.body
    authClient.setCredentials({refresh_token:Refresh_Token})
    const calendar = google.calendar('v3')
    const response = await calendar.events.insert({
      auth:authClient,
      calendarId: 'telehealthgcp@gmail.com',
      requestBody:{
        summary:summary,
        description:desc,
        location:location,
        colorId:'2',
        start:{
          dateTime:new Date(startDate),
        },
        end:{
          dateTime: new Date(endDate)
        },
      },
    })
    res.send(response)
    }
  catch(err){
    next(err)
  }
})

module.exports = router;
