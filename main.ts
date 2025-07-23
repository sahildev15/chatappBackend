// import express from 'express';
// import mongoose from 'mongoose';
// import { InitAllViews } from './models/views';
// import OnboardingRouter from './routers/onboarding';
// import PostRouter from './routers/posts';
// import UserRouter from './routers/user';

// const app = express();


// app.use(express.json());

// app.use('/onboarding', OnboardingRouter);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// }
// );

// // app.use(auth);
// // protected routes
// app.use('/user', UserRouter);


// app.use(PostRouter);

// function main() {
//     mongoose.connect(process.env.MONGO_URI).then(
//         () => {
//             console.log('Connected to DB');
//             app.listen(3000, () => {
//                 console.log('Example app listening on port 3000!');
//             }
//             );
//             InitAllViews();
//         }
//     ).catch(
//         (err) => {
//             console.log(err, 'Error connecting to DB');
//         }
//     )
// }

// main();