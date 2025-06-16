import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProductList=()=>{
    const [products, setproducts]=useState([]);
    const [selectedcategory, setSelectCategory]=useState("all");
    const [filteredProducts, setFilteredProducts]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);

    const Prod_per_page=6;

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
            setproducts(res.data);
            setFilteredProducts(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[]);


    // filter
    useEffect(()=>{
        setCurrentPage(1);
        if(selectedcategory==="all"){
            setFilteredProducts(products);
        }else{
            const filtered=products.filter((product)=>product.category===selectedcategory);
            setFilteredProducts(filtered);
            console.log(filtered)
        }
    },[selectedcategory, products]);

    //pagination
    const totPages=Math.ceil(filteredProducts.length/Prod_per_page);
    const startIndex=(currentPage-1)*Prod_per_page;
    const paginatedProducts=filteredProducts.slice(startIndex,startIndex+Prod_per_page);

    return(
        <>
        <h2>product List</h2>
        {/* Filtering */}
        <div style={{marginBottom:"10px"}}>
            <label>Filter by category:</label>
            <select value={selectedcategory} onChange={(e)=>setSelectCategory(e.target.value)} style={{padding:"8px"}}>
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="jewelary">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
            </select>
        </div>

        {/* Product card */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"20px"}}>
            {paginatedProducts.map((product)=>(
                <div key={product.id} style={{border:"1px Solid black",padding:"10px",textAlign:"center", marginBottom:"10px"}}>
                    <img src={product.image} alt={product.title} style={{height:"150px",objectFit:"contain"}}/>
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                    <p>{product.category}</p>
                </div>
            ))}
        </div>

        {/* pagination control */}
        <div>
            <button onClick={()=>setCurrentPage((prev)=>Math.max(prev-1,1))} disabled={currentPage===1}
                style={{marginRight:"8px"}}>
                Previous
            </button>
            <button onClick={()=>setCurrentPage((prev)=>Math.min(prev+1,totPages))} disabled={currentPage===totPages}
                style={{marginLeft:"8px"}}>
                Next
            </button>
        </div>
        </>
    )

}
export default ProductList;