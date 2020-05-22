

interface IUser {
    name: string;
    age: number;
}



export let users: Array<IUser> =[
    {
      name: "matheus",
      age: 20
    },
    {
      name: "Rafaela",
      age: 17
    }
]



const getUsers = ({response}: {response: any}) =>{
    response.body = users
};

const getUser = ({params, response}: { params: { name: string }; response: any }) => {
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

const addUser = async ({request, response} : { request: any; response: any })  => {
    const body = await request.body();
    const user = body.value;
    users.push(user);

    response.body = { msg: 'Ok' };
    response.status = 200;
}

const updateUser = async ({params, request, response} :  {params: {name: string}; request: any; response: any })  => {
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

const removeUser = ({params, response} : { params: { name: string }; response: any })  => {
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

export {removeUser,  updateUser, addUser, getUser, getUsers}