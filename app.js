const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const itemsRoutes = require('./routes/items-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')


const app = express();

dotenv.config()


app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

//  ========== UPPGIFT 4 ===========

const morgan = require('morgan')
const helmet = require('helmet')


app.use(morgan('common'))
app.use(helmet())


app.get('/api/knapp', (req, res) => {
  res.send('Frontend-knapp klickad, hej från backend!')
})


// ===================================

app.use('/api/items', itemsRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  return next(error);
});

app.use((error, req, res, next) => {

  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  
  if(res.headerSent) return next(error);
  
  res.status(error.code || 500)
  res.json( { message: error.message || 'An unknown error occured!' })
})

mongoose
  .connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true}
    )
  .then(() => {
    app.listen(process.env.PORT)
  })
  .catch(err => {
    console.log(err)
  })

  // mongoose
  // .connect(`mongodb+srv://splitadmin:split123@cluster0.hck2j.mongodb.net/splitDB?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true})
  // .then(() => {
  //   app.listen(5000)
  // })
  // .catch(err => {
  //   console.log(err)
  // })