const express=require('express')
const cors=require('cors')
const app=express();
require('dotenv').config();
const port=process.env.PORT

app.use(express.json())
app.use(cors())
const configureDB=require('./config/db')
configureDB()

const authenticateUser = require('./app/middlewares/AuthenticateUser');
const roleAuth=require('./app/middlewares/roleAuth')
const {adminCltr,userCltr} = require('./app/controllers/users-controller');
const eventCltr = require('./app/controllers/event-controller');
const couponCltr = require('./app/controllers/coupon-controller');
const paymentCltr = require('./app/controllers/payment-controller');
const ticketCltr = require('./app/controllers/ticket-controller');
const reviewCltr = require('./app/controllers/review-controller');


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
app.put('/admin/update/:id',authenticateUser,roleAuth(['admin']),adminCltr.accountUpdate)



//Event Routes
app.post('/events/create',authenticateUser,roleAuth(['organiser']),eventCltr.create)
app.get('/events',authenticateUser,roleAuth(['organiser']),eventCltr.list)
app.put('/event/:id',authenticateUser,roleAuth(['organiser']),eventCltr.update)
app.delete('/event/:id',authenticateUser,roleAuth(['organiser']),eventCltr.remove)


//Coupon Routes
app.post('/coupon/create',authenticateUser,roleAuth(['organiser']),couponCltr.create)
app.get('/coupon',couponCltr.list)
app.put('/coupon/:id',couponCltr.update)
app.delete('/coupon/:id',couponCltr.remove)


//Payment Routes
app.post('/payment/create',paymentCltr.create)
app.get('/payment',paymentCltr.list)
app.put('/payment/:id',paymentCltr.update)
app.delete('/payment/:id',paymentCltr.remove)


//Ticket routes
app.post('/ticket/create',ticketCltr.create)
app.get('/ticket',ticketCltr.list)
app.put('/ticket/:id',ticketCltr.update)
app.delete('/ticket/:id',ticketCltr.remove)

app.post('/book', authenticateUser, ticketCltr.bookTicket)


//Review routes
app.post('/review/create',reviewCltr.create)
app.get('/review',reviewCltr.list)
app.put('/review/:id',reviewCltr.update)
app.delete('/review/:id',reviewCltr.remove)

app.listen(port,()=>{
    console.log("server is running on the port",port)
})