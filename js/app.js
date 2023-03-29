const loadphone=async(searchText,dataLimit)=>{ 
    const url= `https://openapi.programming-hero.com/api/phones?search=${searchText}` 
    const res=await fetch(url); 
    const data=await res.json();
    display(data.data,dataLimit);
} 




const display=(phones,dataLimit)=>{  
    // just for console show 
console.log(phones);   

// display 9 data show 
const showAll=document.getElementById('showAll'); 
if(dataLimit && phones.length>9)
{
  phones=phones.slice(0,9); 
  showAll.classList.remove('d-none');
}
else{
  showAll.classList.add('d-none');
}

// no result found section  
const error=document.getElementById('error-mssg'); 
if(phones.length===0){
     error.classList.remove('d-none');
}
else{ 
     error.classList.add('d-none');
} 

// show all phone 
const phoneCard=document.getElementById('phone-card');  
phoneCard.innerHTML='';
phones.forEach(phone => { 
    const phonediv=document.createElement('div'); 
    phonediv.classList.add('col'); 
    phonediv.innerHTML=`
    <div class="row g-0" style="padding:15px;border-radius: 20px;
    background: #e0e0e0;
    ">
                    <div class="col-md-4" style="padding:10px;">
                      <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button onclick="showAllDetails('${phone.slug}')" style="color:#ffff;" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button> 
                      </div>
                    </div>
                  </div>
    `; 
    phoneCard.appendChild(phonediv);

});  
// stop lodear
togglespinner(false);
} 
// show all details button API section  
const showAllDetails=async(id)=>{
  const url=`https://openapi.programming-hero.com/api/phone/${id}`; 
  const res=await fetch(url); 
  const data=await res.json(); 
  ShowDetails(data.data);
}

const ShowDetails=phone=>{  
  console.log(phone)
 const modalTital=document.getElementById('exampleModalLabel'); 
 modalTital.innerText=phone.name; 
 const modalDetails=document.getElementById('modalDetails'); 
 modalDetails.innerHTML=`
 <p>Release Date : ${phone.releaseDate}</p>
 <p>Main Features</p>
 <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
 <p>Display Size: ${phone.mainFeatures.displaySize}</p>
 <p>Storage: ${phone.mainFeatures.memory}</p>
 `;
}
// showall button click  
document.getElementById('showAll-btn').addEventListener('click',function(){ 
  processSearch();
})

const processSearch=(dataLimit)=>{ 
  const searchfiled = document.getElementById('src-fild'); 
  const searchText = searchfiled.value;
  loadphone(searchText,dataLimit); 
  togglespinner(true);
}

// searching section  
   document.getElementById('src-btn').addEventListener('click',function(){ 
   processSearch(10);
//    start loader 
})  

// show data when search and Enter key press  
document.getElementById('src-fild').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10);
    }
});
 
// loader function  
const togglespinner=islodeaing=>{ 
    const loader=documnet.getElementById('loader');
    if(islodeaing===true)  
    {
        loader.classList.remove('d-none');
    } 
    else{ 
        loader.classList.add('d-none');
    }
} 
loadphone('apple');