import ProductModel from "../model/productmodel.js";

const FindAllProuct = async () => {
  return await ProductModel.find();
};

export const seedInitialProducts =  async() => {
  const products = [
    {
      title: "Apple iPhone 15",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      price: 999,
      stock: 50,
    },
    {
      title: "Samsung Galaxy S24",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      price: 899,
      stock: 40,
    },
    {
      title: "MacBook Air M3",
      image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
      price: 1299,
      stock: 25,
    },
    {
      title: "Sony WH-1000XM5",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      price: 349,
      stock: 60,
    },
    {
      title: "Apple Watch Series 10",
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
      price: 499,
      stock: 35,
    },
    {
      title: "Logitech MX Master 3S",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
      price: 99,
      stock: 100,
    },
    {
      title: "Mechanical Keyboard",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      price: 120,
      stock: 70,
    },
    {
      title: "Dell UltraSharp Monitor",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
      price: 450,
      stock: 20,
    },
    {
      title: "Gaming Chair",
      image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
      price: 280,
      stock: 15,
    },
    {
      title: "External SSD 1TB",
      image: "https://images.unsplash.com/photo-1580894908361-967195033215",
      price: 149,
      stock: 80,
    },
  ];

  const checklenProduct= await FindAllProuct();
  if(checklenProduct.length ===1){
    await  ProductModel.insertMany(products);
  }

 
};
