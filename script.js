"use stricts";

//code for clock(Timmer)
const countDownElement = document.getElementById("countdown"); //DOM Manupulation for countdown
function updateCountDown() {
  let date = new Date();
  let hour = date.getHours(); //0-23
  let minutes = date.getMinutes(); //0 -59
  let seconds = date.getSeconds(); //0-59
  let session = "AM";
  if (hour == 0) {
    hour = 12;
  }
  if (hour >= 12) {
    hour = hour - 12;
    session = "PM";
  }
  hour = hour < 10 ? (hour = "0" + hour) : hour;
  minutes = minutes < 10 ? (minutes = "0" + minutes) : minutes;
  seconds = seconds < 10 ? (seconds = "0" + seconds) : seconds;
  countDownElement.innerHTML = `${hour}h : ${minutes}m : ${seconds}s ${session}`;
}
updateCountDown(); //calling function
setInterval(updateCountDown, 1000); // set interval time of 1 sec


var row = null;//global variables
let result = [];
//code for submit
const addResult = (event) => {
  event.preventDefault(); //to stop the form submittig

  //code for meal input
  var meal = document.getElementsByName("meal");
  var str = " ";
  for (let i = 0; i < meal.length; i++) {
    if (meal[i].checked == true) {
      str += meal[i].value + " ";
    }
  }
  
  checkData() //calling func to check the data
  //storing data into object form
  let data = {
    meal_type: str,
    calories: document.getElementById("cal2").value,
    description: document.getElementById("text").value,
    time: document.getElementById("time").value
  };
  
  if(selectedIndex === -1){//code for edit nd update
    result.push(data);
  } else{
    result.splice(selectedIndex,1,data);
  }
  // result.push(data);
  document.forms[0].reset(); //to clear the form for the next entries
  //document.querySelector('form').reset();

  //saving to localstorage
  localStorage.setItem("MyList", JSON.stringify(result));


  //getting data from local storage
  var data2 = localStorage.getItem('MyList');
  // console.log(data2);
  var json_object = JSON.parse(data2);
  // console.log(json_object);

    if(json_object.length){ //getting array data which is selected 
      var y = json_object[json_object.length - 1];
    }
    
    //if data in show table or update
    if(row == null){
      showData();
    } else {
      update(json_object);
    }
    
    //function to show data in table 
    function showData(){
    var table = document.getElementById("tb");//get html table
    var data3 = y;
    var row = table.insertRow();//add new empty row in table
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var actioncell = row.insertCell(4);
    var actioncell2 = row.insertCell(5);
    var actioncell3 = row.insertCell(6);

    cell1.innerHTML = data3.meal_type;
    cell2.innerHTML = data3.calories;
    cell3.innerHTML = data3.description;
    cell4.innerHTML = data3.time;
    actioncell.innerHTML = `<button id="viewbtn" class="trigger" onclick="toggleModal(this)">View</button>`;
    actioncell2.innerHTML =`<button id="editbtn" onclick="onEditPressed(this)">Edit</button>`;
    actioncell3.innerHTML = `<button id="deletebtn" onclick="onDelete(this)">Delete</button>`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn4").addEventListener("click", addResult);
});


//function to print error message for calories value
function checkData(){
  var valid = false;

  if (document.getElementById("breakfast").checked) {
    var cal = document.getElementById("cal2").value;
    let error = document.getElementById("invalid");
    if(cal < 300 ) {
      error.textContent = "Range Between 300-700";
    } else if(cal > 700){
      error.textContent = "Range Betweeen 300-700";
    } else {
    error.textContent = " ";
  }
  valid = true;

} else if (document.getElementById("lunch").checked){
  var cal = document.getElementById("cal2").value;
  let error = document.getElementById("invalid");
  if (cal < 700 ) {
    error.textContent = "Range Between 700-900";
  } else if(cal > 900){
    error.textContent = "Range Between 700-900";
  } else {
    error.textContent = " ";
  }
  valid = true;

} else if(document.getElementById("dinner").checked){
  var cal = document.getElementById("cal2").value;
  let error = document.getElementById("invalid");
  if (cal < 700 ) {
    error.textContent = "Range Between 700-900";
  } else if(cal > 900){
    error.textContent = "Range Between 700-900";
  } else {
    error.textContent = " ";
  }
  valid= true;

} else {
  valid = false;
}
}


//code for reset 
var btnClear = document.getElementById("btn3");
btnClear.addEventListener("click", function deleteItems() {
  localStorage.clear();
}
);

//code for edit option selected row show entry in input field
var selectedIndex =-1;
function onEditPressed(index){
  selectedIndex = -1;
  row = index.parentElement.parentElement;
  document.getElementsByName("meal").value= row.cells[0].innerHTML;
  document.getElementById("cal2").value = row.cells[1].innerHTML;
  document.getElementById("text").value = row.cells[2].innerHTML;
  document.getElementById("time").value = row.cells[3].innerHTML;
  var indexRow = row.rowIndex - 1; //find index of row
  // console.log(indexRow);
  selectedIndex = indexRow;
  var v = JSON.parse(localStorage.getItem('MyList'));//find the array from local storage
  //  console.log(v);
   v.splice(indexRow, 1);
   localStorage.setItem('MyList', JSON.stringify(v));
}
// var selectedIndex = -1;
//code to update table records on edit option
function update(formData){
  var indexRow = row.rowIndex - 1;
  var updateData = formData[indexRow];
  // console.log(updateData); 
  row.cells[0].innerHTML =updateData.meal_type;
  row.cells[1].innerHTML = updateData.calories;
  row.cells[2].innerHTML = updateData.description;
  row.cells[3].innerHTML = updateData.time;
  row = null;
}


const modal = document.querySelector(".modal");//taking modal box
const closeButton = document.querySelector(".close-button");//span element selected here

function toggleModal(view) { //when click on view button this passed as argument to view parameter

  var row = view.parentElement.parentElement; // getting parent data
  // console.log(row);
  var index = row.rowIndex - 1; //getting index of data
  // console.log(index);
  var dataLocal = JSON.parse(localStorage.getItem('MyList'));//find the array from local storage
  // console.log(dataLocal);
  var obj_index = dataLocal[index];//find the obj from local storage of that index
  // console.log(obj_index);
  
  var modal = document.getElementById("myModal");
  var modaltable = document.getElementById("modalTable")
  // console.log(modal);

  removeRow();//calling function to remove modal data row for next entry
//function for deleting privious row in modal table
  function removeRow(){
    if(index >= 1){
      document.getElementById("modalTable").deleteRow(1);
    } else {
      return modaltable;
    }
  }

  var row = modaltable.insertRow();//inserting new row in a table
  var cell1 = row.insertCell(0);//inserting cells
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

    cell1.innerHTML = obj_index.meal_type;//inserting values to each cell
    cell2.innerHTML = obj_index.calories;
    cell3.innerHTML = obj_index.description;
    cell4.innerHTML = obj_index.time; 
   
  modal.classList.toggle("show-modal"); // display modal box
  //  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  // modal.style.display = "none";
  modal.classList.toggle("show-modal");
}

//code for delete button in a table
function onDelete(td){
  row = td.parentElement.parentElement; //find row
   var index = row.rowIndex - 1;//find the index of the row
   var dataLocal = JSON.parse(localStorage.getItem('MyList'));//find the array from local storage
   var objLocal = dataLocal[index];//find the obj from local storage of that index
   dataLocal.splice(objLocal, 1);// remove that perticular index entry 
   localStorage.setItem('MyList', JSON.stringify(dataLocal));//save getdata back to local storage
   document.getElementById("tb").deleteRow(row.rowIndex);//delete row from UI
   resetform();
  }

//when delete data form get reset
function resetform(){
  document.getElementsByName("meal").checked = false;
  document.getElementById("cal2").value = "";
  document.getElementById("text").value = "";
  document.getElementById("time").value = "";
}

