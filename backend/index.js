const express=require('express')
const cors=require('cors')
const app=express();
require('dotenv').config();
const port=process.env.PORT


app.use(express.json())
app.use(cors())
const configureDB=require('./config/db')
configureDB()

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({ error: err.message });
});


const authenticateUser = require('./app/middlewares/AuthenticateUser');
const roleAuth=require('./app/middlewares/roleAuth')
const {adminCltr,userCltr} = require('./app/controllers/users-controller');
const eventCltr = require('./app/controllers/event-controller');
const reviewCltr = require('./app/controllers/review-controller');
const upload=require('./app/middlewares/multer');
const paymentCltr = require('./app/controllers/payment-controller');


//Sign Up /In
app.post('/users/register',userCltr.register)
app.post('/user/login',userCltr.login)
app.get('/user/account',authenticateUser,userCltr.account)


//Admin route
app.get('/admin/users',authenticateUser,roleAuth(['admin','organiser']),adminCltr.getAllUser)
app.get('/admin/events',authenticateUser,roleAuth(['admin','organiser']),adminCltr.getAllEvents)
app.get('/admin/organisers',authenticateUser,roleAuth(['admin']),adminCltr.getAllOragniser)
app.put('/admin/:id',authenticateUser,roleAuth(['admin']),adminCltr.approveOrganiser)
app.put('/admin/changeRole/:id',authenticateUser,roleAuth(['admin']),adminCltr.changeRole)
app.delete('/admin/removeUser/:id',authenticateUser,roleAuth(['admin']),adminCltr.deleteUser)
app.put('/admin/update/:id',authenticateUser,adminCltr.accountUpdate)



//Event Routes
app.post('/events/create',authenticateUser,roleAuth(['organiser']),upload.array('images'),eventCltr.create)
app.get('/events',authenticateUser,eventCltr.list)
app.get('/events/:id',authenticateUser,eventCltr.getOne)
app.put('/event/:id',authenticateUser,roleAuth(['organiser']),upload.array('images'),eventCltr.update)
app.delete('/event/:id',authenticateUser,roleAuth(['organiser']),eventCltr.remove)
app.get("/nearby", authenticateUser, eventCltr.nearby);


//Payment Routes
app.post('/payment/create',authenticateUser,paymentCltr.create)

//Review routes
app.post('/review/create',authenticateUser,reviewCltr.create)
app.get('/review',reviewCltr.list)
app.get('/review/:id',authenticateUser,reviewCltr.getOne)
app.put('/review/:id',authenticateUser,reviewCltr.update)
app.delete('/review/:id',authenticateUser,reviewCltr.remove)


app.listen(port,()=>{
    console.log("server is running on the port",port)
})