const express = require("express");
const app = express();
const { products } = require("../data");
const PORT = 5000;

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h2>Go to products page</h2><a href = "./api/products">products</a>'
    );
});
app.get("/api/products/:productID", (req, res) => {
  let { productID } = req.params;
  let result = products.find((product) => product.id === Number(productID));
  if (!result) {
    return res.status(404).send(`no product with id :- ${productID}`);
  }
  res.json(result);
});
app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params);
    return res.status(200).send('no reviews');
})
app.get("/api/v1/query", (req, res) => {
  // console.log(req.query);
  let { search, limit } = req.query;
  let newProducts = [...products];
  if (search) {
    newProducts = newProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if(limit) newProducts = newProducts.slice(0,Number(limit));
  console.log(newProducts);

  if (newProducts.length<1){
    return res.status(200).json({"success":true,data:[]});
  }
  res.status(200).json(newProducts);
});
app.all("*", (req, res) => {
  console.log(req.referer);
  res.status(404).send("resource not found");
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
