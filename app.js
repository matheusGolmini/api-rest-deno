import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

let users =[
  {
    name: "matheus",
    age: 20
  },
  {
    name: "Rafaela",
    age: 17
  }
]

export const getUers = ({response}) => response.body = users;

export const getUser = ({params, response}) => {
    const user = users.filter(
        user => user.name.toLowerCase() === params.name.toLowerCase()
    );
    if(user.length){
        response.status = 200;
        response.body = user[0];
        return ;
    }
    response.status = 400;
    response.body = {msg: `Não foi posssivel achar o usuário com esse nome: ${params.name}`};
}

export const addUser = async ({request, response})  => {
    const body = await request.body();
    const user = body.value;
    users.push(user);

    response.body = { msg: 'Ok' };
    response.status = 200;
}

export const updateUser = async ({params, request, response})  => {
    const temp = users.filter(existingUser => 
        existingUser.name.toLowerCase() === params.name.toLowerCase()
    );

    const body = await request.body();
    const { age } = body.value;

    if(temp.length){
        temp[0].age = age;
        response.status = 200;
        response.body = { msg: 'OK'}
        return;
    }
    response.status = 400;
    response.body = { msg: `usário não foi encontrado pelo nome: ${params.name}`}

}


export const removeUser = async ({params, response})  => {
  const lengthBefore = users.length;

  users = users.filter(user => user.name.toLowerCase() !== params.name.toLowerCase());

  if(users.length === lengthBefore){
      response.status = 400;
      response.body = { msg: `usário não foi encontrado pelo nome: ${params.name}`}
      return;
  }
  response.status = 200;
  response.body = { msg: 'OK'}

}

const router = new Router();

router
  .get('/users', getUers)
  .get('/users/:name', getUser)
  .post('/users', addUser)
  .put('/users/:name', updateUser)
  .delete('/users/:name', removeUser)


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Rodando na porta: ", PORT)

await app.listen(`${HOST}:${PORT}`)