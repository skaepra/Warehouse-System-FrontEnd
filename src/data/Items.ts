
export interface Item{
  id:number,
  name:string,
  imageSrc:string[],
  modelycar:string,
  price:number,
  colors:string[],
  description:string
}

const Items:Item[] =
 [
 
     {
      
       id: 4,
       name: 'Rang Rover',
       imageSrc: ['public/1.jpg','public/2.jpg','public/3.jpg','public/4.jpg'],
       modelycar: "2015",
       price: 1350,
       colors:[],
       description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
     },
     {
        id: 5,
        name: 'Feriry',
        imageSrc: ['public/2.jpg','public/3.jpg','public/4.jpg'],
         modelycar: "2020",
        price: 6700,
        colors:[],
        description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
      },
      {
          id: 6,
          name: 'Bogaty',
          imageSrc: ["public/3.jpg",'public/4.jpg'],
           modelycar: "2018",
          price: 20,
          colors:[],
          description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },
        {
          id: 7,
          name: 'Shado',
          imageSrc: ["public/4.jpg"],
          modelycar: "2009",
          price: 300,
          colors:[],
          description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },  

     
 ]
 export default Items;