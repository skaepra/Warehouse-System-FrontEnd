import { Product } from "../features/products/types/product";

 
 const homeProducts:Product[] =
 [
   {     
     id: "564534",
     Name: 'Air Pods', 
     Category: "Electronics",
     Images: [
      "products/3.jfif",     
      "products/311.jfif"
    ],
     ImageAlt: "Front of men's Basic Tee in black.",
     Price: 25,
     Colors:["white","black"],
     Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
      IsFeatured: true
   },
   {
       id: "743534",
       Name: 'Head Phones',
       Category: "Electronics",
       Images: ["products/211.jfif","products/212.jfif","products/213.jfif"],
       ImageAlt: "Front of men's Basic Tee in black.",
       Price: 55,
       Colors:["black","white","red"],
       Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
     },
     {
       id: "98765",
       Name: 'Apple Watch',
       Category: "Electronics",
       Images: ["products/شوفو وش شترولي❤️.jfif","products/111.jfif"],
       ImageAlt: "Front of men's Basic Tee in black.",
       Price: 700,
       Colors:["white","#d6ac6c"],
       Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
     },  
     {
      
       id: "98745",
       Name: 'Hik Vision',
       Category: "Electronics",
       Images: ['products/239887117644111066.jfif'],
       ImageAlt: "Front of men's Basic Tee in black.",
       Price: 1350,
       Colors:[],
       Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
     },
     {
        id: "2654",
        Name: 'Rolex',
        Category: "Accessories",
        Images: ['products/12666442696243758.jfif'],
        ImageAlt: "Front of men's Basic Tee in black.",
        Price: 6700,
        Colors:[],
        Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
      },
      {
          id: "8656",
          Name: 'Puri fier',
          Category: "Accessories",
          Images: ["products/Cosmetic lotion cream jar container mockup.jfif"],
          ImageAlt: "Front of men's Basic Tee in black.",
          Price: 20,
          Colors:[],
          Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },
        {
          id: "132765",
          Name: 'Atop Ring',
          Category: "Accessories",
          Images:[ "products/13299761394220174.jfif"],
          ImageAlt: "Front of men's Basic Tee in black.",
          Price: 300,
          Colors:[],
          Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },  
        {
          id: "95672",
          Name: 'iphone',
          Category: "Electronics",
          Images: ["products/1111111.jfif",'/products/422564377559090130.jfif',"products/33333.jfif"],
          ImageAlt: "Front of men's Basic Tee in black.",
          Price: 1100,
          Colors:["black","white",],
          Description: "Sony has just announced the Sony A6700. An APS-C system camera with AI processing unit and great autofocus. It is a hybrid camera for both ..",
        },    
 ]
 export const productsMap: Record<string, Product> = homeProducts.reduce((acc, product) => {
   acc[product.id] = product;
   return acc;
 }, {} as Record<string, Product>);
 export default homeProducts;