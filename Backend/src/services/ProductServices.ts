import ProductModel from "../model/productmodel.js";

const FindAllProuct = async () => {
  return await ProductModel.find();
};

export const seedInitialProducts =  async() => {
const products = [
  {
    product_id:1,
    title: "Apple iPhone 15",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    price: 999,
    stock: 50,
    descrition:
      "The latest Apple smartphone featuring the A16 Bionic chip, Super Retina XDR display, and an advanced dual-camera system.",
  },
  {
    product_id:2,
   title: "Samsung Galaxy S24",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    price: 899,
    stock: 40,
    descrition:
      "Premium Android smartphone with Galaxy AI features, Dynamic AMOLED display, and a high-performance processor.",
  },
  {
    product_id:3,
    title: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    price: 349,
    stock: 60,
    descrition:
      "Industry-leading wireless headphones with exceptional noise cancellation and crystal-clear sound quality.",
  },
  {
    product_id:4,
    title: "Apple Watch Series 10",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
    price: 499,
    stock: 35,
    descrition:
      "Advanced smartwatch with fitness tracking, health monitoring, GPS, and seamless iPhone integration.",
  },
  {
    product_id:5,
    title: "Logitech MX Master 3S",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    price: 99,
    stock: 100,
    descrition:
      "Ergonomic wireless mouse designed for professionals with ultra-fast scrolling and precise tracking.",
  },
  {
    product_id:6,
    title: "Mechanical Keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    price: 120,
    stock: 70,
    descrition:
      "RGB mechanical keyboard with tactile switches, durable aluminum frame, and customizable lighting effects.",
  },
  {
    product_id:7,
    title: "Dell UltraSharp Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    price: 450,
    stock: 20,
    descrition:
      "27-inch 4K IPS monitor delivering vibrant colors, ultra-thin bezels, and professional-grade accuracy.",
  },
  {
    product_id:8,
    title: "Gaming Chair",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
    price: 280,
    stock: 15,
    descrition:
      "Comfortable ergonomic gaming chair with adjustable lumbar support, reclining backrest, and premium materials.",
  },
  {
    product_id:9,
    title: "External SSD 1TB",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215",
    price: 149,
    stock: 80,
    descrition:
      "Portable 1TB external SSD offering ultra-fast data transfer, compact design, and reliable storage.",
  },
];
  const checklenProduct= await FindAllProuct();
  if(checklenProduct.length ==0){
    await  ProductModel.insertMany(products);
  }

 
};
