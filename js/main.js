var productNameInput=document.getElementById("productName");
var productPriceInput=document.getElementById("productPrice");
var productCategoryInput=document.getElementById("productCategory");
var productDescInput=document.getElementById("productDesc");
var addBtn=document.getElementById("addBtn");
var inputs=document.getElementsByClassName("form-control");
var products=[];
var currentIndex=0;

if(localStorage.getItem("productsList")==null)
{
    products=[];
}
else
{
    products=JSON.parse(localStorage.getItem("productsList"));
    displayData();
}

addBtn.onclick=function() 
{
    if(addBtn.innerHTML=="add product"){
        addProduct();

    }
    else{
        updateProduct();
    }
    displayData();
    clearform();
}

function addProduct()
{
    var product=
    {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
    }
    products.push(product);
    localStorage.setItem("productsList",JSON.stringify(products));

}

function displayData()
{
    var cartona="";
    for(var i=0;i<products.length;i++){
        cartona+=`<tr>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].desc}</td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                    <td><button onclick="getProductInfo(${i})" class="btn btn-warning">update</button></td> 
                 </tr>`
    }
    document.getElementById("tableBody").innerHTML=cartona;
}

function deleteProduct(index)
{
    products.splice(index,1);
    displayData();
    localStorage.setItem("productsList",JSON.stringify(products));
} 

function clearform()
{
    for(var i=0;i<inputs.length;i++){
        inputs[i].value=""
    }
}

function search(searchText)
{
    var cartona="";
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(searchText.toLowerCase())){
        cartona+=`<tr>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].desc}</td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                    <td><button class="btn btn-warning">update</button></td> 
                 </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=cartona;
}

function getProductInfo(index)
{
    currentIndex=index;
    var product=products[index];
    productName.value=product.name;
    productPrice.value=product.price;
    productCategory.value=product.category;
    productDesc.value=product.desc;
    addBtn.innerHTML="update product";
}

function updateProduct()
{
    var product=
    {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }

    products[currentIndex].name=product.name;
    products[currentIndex].price=product.price;
    products[currentIndex].category=product.category;
    products[currentIndex].desc=product.desc;
    localStorage.setItem("productsList",JSON.stringify(products));
}

var httpREquest=new XMLHttpRequest();
httpREquest.open("GET","https://jsonplaceholder.typicode.com/comments");
httpREquest.send();
var comments=[];
httpREquest.addEventListener("readyStateChange",function(){
    if(httpREquest.readyState==4){
        comments=JSON.parse(httpREquest.response);
        displayComments();
    }
})
function displayComments(){
    var cols=``;
    for(var i=0;i<comments.length;i++){
        cols+=`
        <div class="col-md-3">
            <div class="post">
               <h3>${comments[i].id}</h3>
               <h5>${comments[i].name}</h5>
               <p>${comments[i].mail}</p>
            </div>
         </div>
        `
    }
}

//validation

var nameAlert=document.getElementById("nameAlert");
var priceAlert=document.getElementById("priceAlert");
var categoryAlert=document.getElementById("categoryAlert");

productName.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,8}$/;
    if(nameRejex.test(productName.value))      //valid name
    {                                            
        addBtn.removeAttribute("disabled");
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
    }
    else                                        //invalid name
    {    
        addBtn.disabled="true";
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
    }
} 

productPrice.onkeyup=function(){
    var priceRejex=/^[1-9][0-9]{2,8}$/;
    if(priceRejex.test(productPrice.value))      //valid price
    {                                            
        addBtn.removeAttribute("disabled");
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        priceAlert.classList.add("d-none");
    }
    else                                        //invalid price
    {    
        addBtn.disabled="true";
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        priceAlert.classList.remove("d-none");
    }
} 

productCategory.onkeyup=function(){
    var categoryRejex=/^[a-z]{2,8}$/;
    if(categoryRejex.test(productCategory.value))      //valid category
    {                                            
        addBtn.removeAttribute("disabled");
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        categoryAlert.classList.add("d-none");
    }
    else                                        //invalid category
    {    
        addBtn.disabled="true";
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        categoryAlert.classList.remove("d-none");
    }
} 

