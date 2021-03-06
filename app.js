const express = require('express');
const path = require('path');
const morgan = require('morgan');



const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8005);


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/test', function(req, res, next){
  return res.status(200).json({
    code : 200,
    messgae : "ALOHA",
  });
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
  });
  
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });