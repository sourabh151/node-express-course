//jshint esversion:10
//61040
const express = require('express');
const app = express();
const {products} = require('./data');

//  API             VS              SSR
//API - JSON                   SSR - TEMPLATE
//SEND DATA                    SEND TEMPLATE
//RES.JSON()                   RES.RENDER()

//route params reside inside req.params
//query params reside inside req.query
 
app.get('/',(req,res)=>{
    // res.json(products);
    res.send('<h1>home page</h1><a href="/api/products">products</a>');
});
app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image};
    });
    res.json(newProducts);
});

//products/1 :1 => route parameters  
//starts with colon 
//gets stored in req.params.propertyName
app.get('/api/products/:productID',(req,res)=>{
    const {productID} = req.params;
    const singleProduct = products.find((product)=>product.id === Number(productID));
    // console.log(singleProduct);
    // console.log(req);
    if(!singleProduct){
        return res.status(404).send('Product does not exist');
    }

    return res.json(singleProduct);
});

//query parameters start with query?key=value&...
app.get('/api/v1/query',(req,res)=>{
    const {search,limit} = req.query;
    let copyProducts = [...products];
    //sorting if required
    // copyProducts.sort((p,q)=>p.id-q.id);

    if(search){
        copyProducts = copyProducts.filter((product)=>{
            // console.log(product.name);
            return product.name.startsWith(search);
        });
    }
    // console.log(copyProducts);
    if(limit){
        //console.log(limit);
        copyProducts = copyProducts.slice(0,Number(limit));
    }
    if(copyProducts.length<1){
        // res.status(200).send('no products match your search');
        //generic approach to signify that there were no errors but the search didn't yield any result
        return res.status(200).json({'success':true,data:[]});
    }
    res.status(200).json(copyProducts);        
});



app.listen(3000);