import {sql} from "../config/db.js";

export const getProducts = async(req , res) => {

try{
     const products=await sql `
     SELECT * FROM products
     ORDER BY created_at DESC 
     `;
     console.log("Fetched Products:", products);
     res.status(200).json({success:true, data:products})
}
catch(error){
    console.log("Error in get products function :", error);
    res.status(500).json({success:false,message:"Internal server error"});
}
};



export const createProducts = async(req , res) => {
    const {name,image,price}=req.body;

    if((!name || !image || !price)){
        return res.status(400).json({success:false,message:"Please provide all fields"});
    }
    try{
            const newProduct=await sql`
            INSERT INTO products(name,price,image)
            VALUES(${name},${price},${image})
            RETURNING *
            `;
            res.status(201).json({success:true, data:newProduct[0]});
    }
    
        catch(error){
    console.log("Error in create products functiom :", error);
    res.status(500).json({success:false,message:"Internal server error"});
    }
};


export const getProduct=async(req,res)=>{
    const {id}=req.params;
    try{
         const product=await sql`
         SELECT * FROM products
         WHERE id=${id}
         `; 

         res.status(200).json({success:true,data:product[0]});
    }
    catch(errr){
        console.log("Error in get product function :",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};


export const updateProduct=async(req,res)=>{

    const{id}=req.params;
    const {name,price,image}=req.body;

    try{

        const updatedProduct=await sql `
        UPDATE products
        SET name=${name}, price=${price}, image=${image}
        WHERE id=${id}
        RETURNING *
        `;

        if(updatedProduct.length===0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            });
        }

        res.status(200).json({
            success:true,
            data:updatedProduct[0],
        });
    }
    catch(error){
        console.log("Error in update product function :",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }


};



export const deleteProduct=async(req,res)=>{


    const {id}=req.params;

    try{
        const deleteProduct=await sql `
        DELETE FROM products where id=${id}
        RETURNING *
        `;

        
        if(deleteProduct.length===0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            });
        }


        res.status(200).json({
            success:true,
            data:deleteProduct[0],
        });
    }
    catch(error){
        console.log("Error in delete product function :",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};