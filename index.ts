// import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

// const env = Deno.env.toObject();
// const PORT = env.PORT || 4000;
// const HOST = env.HOST || "127.0.0.1";

// let dogs =[
//   {
//     name: "matheus",
//     age: 20
//   },
//   {
//     name: "Rafaela",
//     age: 17
//   }
// ]

// export const getDogs = ({response}) => response.body = dogs;


// const router = new Router();

// router
//   .get('/dogs', getDogs)
//   // .get('/dogs/:name', getDog)
//   // .post('/dogs', addDogs)
//   // .put('/dogs/:name', updateDog)
//   // .delete('/dogs/:name', removeDog)


// const app = new Application();

// app.user(router.routes());
// app.use(router.allowedMethods());

// await app.listen(`${HOST}`)