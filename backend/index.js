const express=require('express')
const cors=require('cors')
const app=express();
require('dotenv').config();
const port=process.env.PORT



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
const configureDB=require('./config/db')
configureDB()

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});




const authenticateUser = require('./app/middlewares/AuthenticateUser');
const roleAuth=require('./app/middlewares/roleAuth')
const {adminCltr,userCltr} = require('./app/controllers/users-controller');
const eventCltr = require('./app/controllers/event-controller');
const reviewCltr = require('./app/controllers/review-controller');
const upload=require('./app/middlewares/multer');
const couponCltr = require('./app/controllers/coupon-controller');
const ticketCltr = require('./app/controllers/ticket-controller');
const paymentCltr=require('./app/controllers/payment-controller')



//Sign Up /In
app.post('/users/register',userCltr.register)
app.post('/user/login',userCltr.login)
app.get('/user/account',authenticateUser,userCltr.account)
app.put("/user/account", authenticateUser, userCltr.updateAccount);
app.put("/user/change-password",authenticateUser,userCltr.changePassword)



//Admin route
app.get('/admin/users',authenticateUser,roleAuth(['admin']),adminCltr.getAllUser)
app.get('/admin/events',authenticateUser,roleAuth(['admin']),adminCltr.getAllEvents)
app.get('/organiser/events',authenticateUser,roleAuth(['organiser']),adminCltr.getAllEvents)
app.get('/admin/organisers',authenticateUser,roleAuth(['admin']),adminCltr.getAllOragniser)
// app.put('/admin/:id',authenticateUser,roleAuth(['admin']),adminCltr.approveOrganiser)
app.put('/admin/changeRole/:id',authenticateUser,roleAuth(['admin']),adminCltr.changeRole)
app.delete('/admin/removeUser/:id',authenticateUser,roleAuth(['admin','organiser']),adminCltr.deleteUser)
app.put('/admin/update/:id',authenticateUser,adminCltr.accountUpdate)
app.get("/check-admin",authenticateUser, userCltr.checkAdmin);





//Event Routes
app.post('/events/create',authenticateUser,roleAuth(['organiser']),upload.array('image'),eventCltr.create)
app.get('/events',authenticateUser,eventCltr.list)
app.get('/events/:id',authenticateUser,eventCltr.getOne)
app.put('/event/:id',authenticateUser,roleAuth(['organiser']),upload.array('images'),eventCltr.update)
app.delete('/event/:id',authenticateUser,roleAuth(['admin','organiser']),eventCltr.remove)
app.get("/nearby", authenticateUser, eventCltr.nearby);
app.put("/event/approve/:id",authenticateUser,roleAuth(['admin']),eventCltr.approve)
app.put("/event/reject/:id",authenticateUser,roleAuth(['admin']),eventCltr.reject)


//Payment Routes
app.post("/payment/create-order",paymentCltr.createOrder)
app.post("/payment/verify-payment",paymentCltr.verifyPayment)


//Ticket Routes
app.get("/tickets/my",authenticateUser,ticketCltr.myTickets)
app.post('/ticket/book',authenticateUser,ticketCltr.book)
app.delete('/ticket/cancel/:id',authenticateUser,ticketCltr.cancel)
app.get("/organiser/tickets/count",authenticateUser,roleAuth(["organiser"]),ticketCltr.totalTickets);
app.post('/ticket/verify',authenticateUser,ticketCltr.verifyQR)
app.get('/organiser/booking',authenticateUser,roleAuth(['organiser']),ticketCltr.bookedUsers)
app.get("/organiser/tickets-per-event",authenticateUser,ticketCltr.ticketsPerEvent);


//Coupon Routes
app.post('/coupon/create',authenticateUser,couponCltr.create);
app.get('/coupons',authenticateUser,roleAuth(['organiser']),couponCltr.list);
app.put('/coupon/:id',authenticateUser,couponCltr.update);
app.post('/coupon/apply',authenticateUser,couponCltr.applyCoupon)


//Review routes
app.post('/review/create',authenticateUser,reviewCltr.create)
app.get('/review',reviewCltr.list)
app.get('/review/:id',authenticateUser,reviewCltr.getOne)
app.put('/review/:id',authenticateUser,reviewCltr.update)
app.delete('/review/:id',authenticateUser,reviewCltr.remove)


app.listen(port,()=>{
    console.log("server is running on the port",port)
})