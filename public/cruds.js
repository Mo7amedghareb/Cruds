let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mode='Create';
let temp;
//get total
total.innerHTML='0';
function gettotal(){
    if(price.value != ''){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='green';
    }
    else{
        total.innerHTML='0';
        total.style.background='red';
    }
}
//create product
 let arr ; 
 if(localStorage.product != null){
     arr = JSON.parse(localStorage.product)
 }
 else{  
     arr=[];
 }
 submit.onclick=function(){
    let newproduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }
    //count button
    if(title.value!='' && price.value!='' && count.value<101){
        if(mode=='Create'){
            if(newproduct.count>1){
                for(let i=0;i<newproduct.count;i++){
                    arr.push(newproduct)
                }
            }
            else{
                arr.push(newproduct)
            }
        }
        else{
            arr[temp]=newproduct;
            mode='Create';
            submit.innerHTML='Create';
            count.style.display='block'
            
        }
        cleardata()
    }
    
    localStorage.setItem('product',  JSON.stringify(arr))
    
    showdata()
 }
 
 //clear inputs
 function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='0';
    count.value='';
    category.value='';

 }
 //read items on table
 function showdata(){
    gettotal()
    let table='';
    for(let i=0;i<arr.length;i++){
        table+=
        `
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].total}</td>
            <td>${arr[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">Update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
        </tr>
        `
        
    }
    document.getElementById('tbody').innerHTML=table;
    //delete all button
    let btndelall=document.getElementById('deleteall');
    if(arr.length>1){
        btndelall.innerHTML=`
        <button onclick="delall()">Delete All(${arr.length})</button>

        `
    }
    else{
        btndelall.innerHTML='';
    }
 }
 showdata()
 //delete button
function deletedata(i){
    arr.splice(i,1);
    localStorage.product=JSON.stringify(arr);
    showdata()
}
//delete all function
function delall(){
    localStorage.clear();
    arr.splice(0);
    showdata()
}
//update data
function updatedata(i){
    title.value=arr[i].title;
    price.value=arr[i].price;
    taxes.value=arr[i].taxes;
    ads.value=arr[i].ads;
    discount.value=arr[i].discount;
    gettotal();
    count.style.display=`none`
    category.value=arr[i].category;
    submit.innerHTML= 'Update'
    mode='update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
//search 
let searchmode='title';
function getsearchmode(id){
    let search1=document.getElementById('search')
    if(id=='searchtitle'){
        searchmode='title';
        search1.placeholder='search by title ';
    }
    else{
        searchmode='category';
        search1.placeholder='search by category ';
    }
    search1.focus()
    search1.value=''
    showdata()
}
function searchdata(value){
    let table='';
    if(searchmode=='title'){
        for(let i=0;i<arr.length;i++){
            if(arr[i].title.includes(value.toLowerCase())){
                table+=
                `
                    <tr>
                        <td>${i+1}</td>
                        <td>${arr[i].title}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].taxes}</td>
                        <td>${arr[i].ads}</td>
                        <td>${arr[i].discount}</td>
                        <td>${arr[i].total}</td>
                        <td>${arr[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                    </tr>
                `
            }
        }
    }
    else{
        for(let i=0;i<arr.length;i++){
            if(arr[i].category.includes(value.toLowerCase())){
                table+=
                `
                    <tr>
                        <td>${i+1}</td>
                        <td>${arr[i].title}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].taxes}</td>
                        <td>${arr[i].ads}</td>
                        <td>${arr[i].discount}</td>
                        <td>${arr[i].total}</td>
                        <td>${arr[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                    </tr>
                `
            }
        }
    }

    document.getElementById('tbody').innerHTML=table;
}










