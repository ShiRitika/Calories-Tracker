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
//code for submit
let result = [];
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

  checkData()
  //storing data into object form
  let data = {
    meal_type: str,
    calories: document.getElementById("cal2").value,
    description: document.getElementById("text").value,
    time: document.getElementById("time").value
  };
  result.push(data);
  document.forms[0].reset(); //to clear the form for the next entries
  //document.querySelector('form').reset();

  //saving to localstorage
  localStorage.setItem("MyList", JSON.stringify(result));


  //getting data from local storage
  var data2 = localStorage.getItem('MyList');
  console.log(data2);
  var json_object = JSON.parse(data2);
  console.log(json_object);

    if(json_object.length){ //getting array data which is selected 
      var y = json_object[json_object.length - 1];
    }
  

    //if data in show table or update
    if(row == null){
      showData();
    } else {
      update(y);
    }
    
    //function to show data in table 
    function showData(){
    var table = document.getElementById("tb");//get html table
    var data3 = y;
    //console.log(data3);
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

//code for edit option selected abd show entry in input field
function onEditPressed(index){
  row = index.parentElement.parentElement;
  document.getElementsByName("meal").value= row.cells[0].innerHTML;
  document.getElementById("cal2").value = row.cells[1].innerHTML;
  document.getElementById("text").value = row.cells[2].innerHTML;
  document.getElementById("time").value = row.cells[3].innerHTML;
}

//code to update table records on edit option
function update(formData){
  row.cells[0].innerHTML =formData.meal_type;
  row.cells[1].innerHTML = formData.calories;
  row.cells[2].innerHTML = formData.description;
  row.cells[3].innerHTML = formData.time;
  row = null;
}


const modal = document.querySelector(".modal");//taking modal box
const trigger = document.querySelector(".trigger");// sselecting button
const closeButton = document.querySelector(".close-button");//span element selected here

function toggleModal(view) { //when click on view button this passed as argument to view parameter
  //console.log(view);
  var row = view.parentElement.parentElement; // getting parent data
 // console.log(row);
 // var modal = document.getElementById("myModal");

  $(document).ready(function(){ //code in jquery to insert values of table to modal box
    $('#tr').empty(); //table row get empty
    $('#td2').append(row); // insert row values to table
   });
   
   modal.classList.toggle("show-modal"); // display modal box
}

function windowOnClick(event) {
    if (event.target === modal) {
      modal.style.display= "none";
    }
}


// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

//trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//code for delete button in a table
function onDelete(td){
  row = td.parentElement.parentElement;
  document.getElementById("tb").deleteRow(row.rowIndex);
  resetform();
  localStorage.removeItem("MyList", JSON.stringify(result));
}
//when delete data form get reset
function resetform(){
  document.getElementsByName("meal").checked = false;
  document.getElementById("cal2").value = "";
  document.getElementById("text").value = "";
  document.getElementById("time").value = "";
}

