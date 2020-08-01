const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const path = require('path')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('DB CONNECTED!'));

mongoose.connection.on('error', err => console.log('DB ERROR!!', err.message));



app.use(bodyParser.json());

app.use(cors());

const controllers = require('./controllers/controllers');


app.use('/signin',controllers.signin);
app.use('/signup',controllers.signup);
app.use('/allusers',controllers.getAllUsers);
app.use('/user/:userId',controllers.getUser);
app.put('/change/:userId',controllers.changeData);

// app.use('/', postRoutes);
// app.use('/', authRoutes);
// app.use('/', userRoutes);
// app.use('/', quesRoutes);

app.use('/home',(req,res)=>res.json({"msg":"Home"}))



app.use(express.static('prep/build'))
app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'prep','build','index.html'))
})

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized!' });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`);
});

// apiDocs
// app.get("/api", (req, res) => {
//     fs.readFile("docs/apiDocs.json", (err, data) => {
//         if (err) {
//             res.status(400).json({
//                 error: err
//             });
//         }
//         const docs = JSON.parse(data);
//         res.json(docs);
//     });
// });

// middleware -
// app.use(morgan('dev'));