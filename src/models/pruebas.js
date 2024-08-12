dataValues=[ {
    id: 3,
    firstName: 'andres',
    lastName: 'rincon',
    email: 'jhosuarincon@gamil.com',
    password: '$2b$10$9JeMxjRO3W04udp2DUdk3uDSBDbicadBXGKukPsptJPuKQsFfkofK'
    
  },
  {
    id: 4,
    firstName: 'jhosua',
    lastName: 'rincon',
    email: 'jhosuarincon@gamil.com',
    password: '$2b$10$9JeMxjRO3W04udp2DUdk3uDSBDbicadBXGKukPsptJPuKQsFfkofK'
  },
  {
    id: 5,
    firstName: 'jairo',
    lastName: 'rincon',
    email: 'jhosuarincon@gamil.com',
    password: '$2b$10$9JeMxjRO3W04udp2DUdk3uDSBDbicadBXGKukPsptJPuKQsFfkofK'
  }



]

const valores = dataValues.map((x)=>{
    if(x.password !=""){
        delete x.password
    }
    return x
})

console.log(valores)



const user = {
  id: 3,
  firstName: 'andres',
  lastName: 'rincon',
  email: 'jhosuarincon@gamil.com',
  password: '$2b$10$9JeMxjRO3W04udp2DUdk3uDSBDbicadBXGKukPsptJPuKQsFfkofK'
  
}

console.log(user)
const post={
  "id": 3,
  post: "Programar la funcion original",
  userId: "",
  updatedAt: "2024-08-11T13:18:27.201Z",
  createdAt: "2024-08-11T13:18:27.201Z"
}


let valores1={}
for (const property in post) {
  (post.userId !="")?  valores1.post = post.post : valores1={...post, userId:post.id}
        
 
}
console.log(valores1)






