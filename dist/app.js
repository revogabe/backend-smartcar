import cors from 'cors';
import createError from 'http-errors';
import express from 'express';
import morgan from 'morgan';
import userRegisterRouter from './routes/register.js';
import userLoginRouter from './routes/login.js';
import userGetRouter from './routes/user.js';
import userUpdateRouter from './routes/update.js';
import carsCreateRouter from './routes/create-cars.js';
import carsListRouter from './routes/list-cars.js';
import carsDeleteRouter from './routes/delete-cars.js';
import supplyCreateRouter from './routes/create-fuel.js';
import supplyListRouter from './routes/list-fuel.js';
import supplyDeleteRouter from './routes/delete-fuel.js';
import supplyUpdateRouter from './routes/update-fuel.js';
const app = express();
app.use(morgan('tiny'));
// Then pass these options to cors:
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/register', userRegisterRouter);
app.use('/api/login', userLoginRouter);
app.use('/api/user', userGetRouter);
app.use('/api/update', userUpdateRouter);
app.use('/api/cars/create', carsCreateRouter);
app.use('/api/cars/list', carsListRouter);
app.use('/api/cars/delete', carsDeleteRouter);
app.use('/api/supply/create', supplyCreateRouter);
app.use('/api/supply/list', supplyListRouter);
app.use('/api/supply/delete', supplyDeleteRouter);
app.use('/api/supply/update', supplyUpdateRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ message: 'error', error: err });
});
app.listen(3333, () => console.log('TESTANDO'));
//# sourceMappingURL=app.js.map