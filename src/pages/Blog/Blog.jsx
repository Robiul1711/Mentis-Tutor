function chekingInventory() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("checking Inventory....");
      let stock = 4;
      resolve(stock);
      // reject(new Error("Out of stock"));
    }, 2000);
  });
  return promise;
}

function creatingOrder() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Creating Order....");
      resolve();
      // reject(new Error("Payment failed"));
    }, 1000);
  });
  return promise;
}

function chargePayment() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Charging Payment....");
      resolve();
      // reject(new Error("Payment failed"));
    }, 1500);
  });
  return promise;
}

async function main() {
  try {
    await chekingInventory();
    await creatingOrder();
    await chargePayment();
  } catch (error) {
    console.log("Err", error);
  }

  //   chekinhInventory().catch((error) => {
  //     console.log(error);
  //   })
  //   .then(creatingOrder).catch((error) => {
  //     console.log(error);
  //   })
  //   .then(chargePayment).catch((error) => {
  //     console.log(error);
  //   })

  console.log("Other request processing");
}
main();

// Component code
import React from "react";

const Blog = () => {
  return <div>Blog</div>;
};

export default Blog;
