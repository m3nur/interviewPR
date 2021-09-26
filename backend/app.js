const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const dbConnect = require('./config/dbCOnnect');
const { dbConnectionURL } = require('./config/dbConfig');
const User = require('./database/models/user');
const multer = require('multer');
const moment = require('moment');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const wordRouter = require('./routes/wordRouter');
const googleRouter = require('./routes/googleRouter');
const companyRouter = require('./routes/companyRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const secretKey =
  'f7f5f20ccbe470b80c02610b8c99c44f8ac4cd74abb7ef28ce8d4d2f89713f8b5f1f235f8bb3b7e9d4686f08339b595cdf53eefa77a2520f95331cd6c649589f';
dbConnect();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img');
  },
  filename: (req, file, cb) => {
    const date = moment().format('DDMMYYY-HHmmss_SSS');
    cb(null, `${date}-${file.originalname}`);
  },
});

app.set('view engine', 'hbs');
app.set('cookieName', 'connect-sid');

app.use(express.static(path.join('../frontend/build')));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(
  cors({
    origin: 'https://interview-react-express.herokuapp.com/',
    credentials: true,
  })
);

app.use(
  sessions({
    name: app.get('cookieName'),
    secret: secretKey,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbConnectionURL,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1e3 * 86400 * 7,
    },
  })
);
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('../frontend/build/')));

app.use(async (req, res, next) => {
  const userID = req.session?.user?.id;
  if (userID) {
    const currentUser = await User.findById(userID);
    if (currentUser) {
      res.locals.password = currentUser.password;
      res.locals.name = currentUser.name;
      res.locals.email = currentUser.email;
      res.locals.id = currentUser._id;
    }
  }

  next();
});

app.use(multer({ storage: storageConfig }).single('image'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../frontend/build/index.html'));
});

app.post('public/img', function (req, res, next) {
  let filedata = req.file;
  if (!filedata) res.send('Ошибка при загрузке файла');
  else res.send('Файл загружен');
});

app.use('/api/company', companyRouter);
app.use('/api/google', googleRouter);
app.use('/api/user', userRouter);
app.use('/api/word', wordRouter);
app.use('/api/review', reviewRouter);

app.listen(PORT, () => {
  console.log(`сервер запущен на порте  ${PORT}`);
});
