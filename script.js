import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const firebaseConfig = {
    apiKey: "AIzaSyAbUzSccFBq05wvhxWLE0NB4NMIxz1fGSw",
    authDomain: "add-to-cart-website-b7071.firebaseapp.com",
    databaseURL: "https://add-to-cart-website-b7071-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "add-to-cart-website-b7071",
    storageBucket: "add-to-cart-website-b7071.appspot.com",
    messagingSenderId: "259961749815",
    appId: "1:259961749815:web:d641694630c9f1663edab2"
  };

const App=initializeApp(firebaseConfig)
const database=getDatabase(App)
const ShoppingList=ref(database,"Items")
const list_of_items=document.getElementById("Shopping-list")


const input=document.getElementById("input-field")
const button=document.getElementById("Add");

button.addEventListener("click",function(){
    let inputval=input.value 
    push(ShoppingList,inputval)
    console.log('${inputval} added to database')
    clearInput();
    //appendItems(inputval);
})

onValue(ShoppingList,function(snapshot){
    if(snapshot.exists()){
        let listArrays=Object.entries(snapshot.val())
        list_of_items.innerHTML = ""
        for(let i=0;i<listArrays.length;i++){
            let currentItem=listArrays[i];
            let currentItemId=currentItem[0]
            let currentItemValue=currentItem[1]
            appendItems(currentItem);
        }
    }
    else{
        list_of_items.innerHTML="No items....yet"
    }
})

function clearInput(){
    input.value=""
}
function appendItems(value){
    let itemId=value[0]
    let itemVal=value[1]
    let newEl=document.createElement("li")
    newEl.textContent=itemVal
    newEl.addEventListener('click',function(){
        let deleteRef=ref(database,`Items/${itemId}`)
        remove(deleteRef)
    })
    
    list_of_items.append(newEl)
}