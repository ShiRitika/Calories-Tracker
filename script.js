"use stricts";

//------------------------code for clock(Timmer)--------------------------
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
  countDownElement.innerHTML = `${hour} : ${minutes} : ${seconds} ${session}`;
}
updateCountDown(); //calling function
setInterval(updateCountDown, 1000); // set interval time of 1 sec

var row = null;
let result = [];

//---------------------------code for submit the form-----------------------------------
const addResult = (event) => {
  event.preventDefault();

  //code for meal input
  let meal = document.getElementsByName("meal");
  var str = "";
  for (var i = 0; i < meal.length; i++) {
    if (meal[i].checked == true) {
      str += meal[i].value + " ";
    }
  }
  let calories_value = document.getElementById("cal2");
  let description_value = document.getElementById("text").value;
  let time_value = document.getElementById("time").value;
  var dis = "disabled";

  let flag = 1;

  validateForm(); //function calling validation

  //---------------------code for validating form------------------
  function validateForm() {
  
    checkMeal();
    checkCalories();
    checkData();
    checkDescription();
    checkTime();

    function checkMeal() {
      if (str == "") {
        document.getElementById("invalid_meal").innerHTML =
          "Please Select meal!";
        flag = 0;
      } else {
        document.getElementById("invalid_meal").innerHTML = "";
        flag = 1;
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    }

    function checkCalories() {
      if (calories_value.value == "") {
        document.getElementById("invalid").innerHTML =
          "Calories Field is Empty!";
        flag = 0;
      } else {
        document.getElementById("invalid").innerHTML = "";
        flag = 1;
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    }

    function checkDescription() {
      if (description_value == "") {
        document.getElementById("invalid_des").innerHTML =
          "Description field is Empty!";
        flag = 0;
      } else {
        document.getElementById("invalid_des").innerHTML = "";
        flag = 1;
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    }

    function checkTime() {
      if (time_value == dis) {
        document.getElementById("invalid_time").innerHTML =
          "Please select Time!";
        flag = 0;
      } else {
        document.getElementById("invalid_time").innerHTML = "";
        flag = 1;
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    }
    if (
      checkDescription() === false ||
      checkTime() === false ||
      checkCalories() === false ||
      checkData() === false ||
      checkMeal() === false
    ) {
      flag = 0;
    } else {
      flag = 1;
    }

    //function to print error message for calories value
    function checkData() {
      if (document.getElementById("breakfast").checked) {
        let cal = document.getElementById("cal2").value;
        let error = document.getElementById("invalid");

        if (cal < 300) {
          error.textContent = "Range Between 300-700";
          flag = 0;
        } else if (cal > 700) {
          error.textContent = "Range Betweeen 300-700";
          flag = 0;
        } else {
          error.textContent = " ";
          flag = 1;
        }
      } else if (document.getElementById("lunch").checked) {
        let cal = document.getElementById("cal2").value;
        let error = document.getElementById("invalid");

        if (cal < 700) {
          error.textContent = "Range Between 700-900";
          flag = 0;
        } else if (cal > 900) {
          error.textContent = "Range Between 700-900";
          flag = 0;
        } else {
          error.textContent = " ";
          flag = 1;
        }
      } else if (document.getElementById("dinner").checked) {
        let cal = document.getElementById("cal2").value;
        let error = document.getElementById("invalid");

        if (cal < 700) {
          error.textContent = "Range Between 700-900";
          flag = 0;
        } else if (cal > 900) {
          error.textContent = "Range Between 700-900";
          flag = 0;
        } else {
          error.textContent = " ";
          flag = 1;
        }
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    }
  }

  //if flag === 0 break here else proceed further to save data in table
  breakme: if (flag === 0) {
    break breakme;
  } else {
    //storing data into object form
    let data = {
      meal_type: str,
      calories: document.getElementById("cal2").value,
      description: document.getElementById("text").value,
      time: document.getElementById("time").value,
    };

    if (selectedIndex === -1) {
      //code for edit nd update
      result.push(data);
    } else {
      result.splice(selectedIndex, 1, data);
    }

    document.forms[0].reset(); //to clear the form for the next entries
    //document.querySelector('form').reset();

    //saving to localstorage
    localStorage.setItem("MyList", JSON.stringify(result));

    //getting data from local storage
    var data2 = localStorage.getItem("MyList");
    var json_object = JSON.parse(data2);

    if (json_object.length) {
      //getting array data which is selected
      var y = json_object[json_object.length - 1];
    }

    //if data in show table or update
    if (row == null) {
      showData();
    } else {
      update(json_object);
    }

    //function to show data in table
    function showData() {
      var table = document.getElementById("tb");
      var data3 = y;
      var row = table.insertRow();
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
      actioncell2.innerHTML = `<button id="editbtn" onclick="onEditPressed(this)">Edit</button>`;
      actioncell3.innerHTML = `<button id="deletebtn" onclick="onDelete(this)">Delete</button>`;
    }
  }
};

//------on submit button click call function addResult----------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn4").addEventListener("click", addResult);
});

//---------------code for edit option selected row show entry in input field---------------
var selectedIndex = -1;
function onEditPressed(index) {
  selectedIndex = -1;
  row = index.parentElement.parentElement;

  let Value1 = row.cells[0].innerHTML;

  //value has whitespace se we need to trim it for further comparison
  let Value = Value1.trim();
  var meal_List = document.getElementsByName("meal");

  if (meal_List[0].value === Value) {
    meal_List[0].checked = Value;
  } else if (meal_List[1].value === Value) {
    meal_List[1].checked = Value;
  } else if (meal_List[2].value === Value) {
    meal_List[2].checked = Value;
  }

  document.getElementById("cal2").value = row.cells[1].innerHTML;
  document.getElementById("text").value = row.cells[2].innerHTML;
  document.getElementById("time").value = row.cells[3].innerHTML;
  var indexRow = row.rowIndex - 1;

  selectedIndex = indexRow;
  var v = JSON.parse(localStorage.getItem("MyList"));

  v.splice(indexRow, 1);
  localStorage.setItem("MyList", JSON.stringify(v));
}
// var selectedIndex = -1;
//code to update table records on edit option
function update(formData) {
  var indexRow = row.rowIndex - 1;
  var updateData = formData[indexRow];

  row.cells[0].innerHTML = updateData.meal_type;
  row.cells[1].innerHTML = updateData.calories;
  row.cells[2].innerHTML = updateData.description;
  row.cells[3].innerHTML = updateData.time;
  row = null;
}

//------------------------code for viewing model box----------------------------------
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal(view) {
  //when click on view button this passed as argument to view parameter

  var row = view.parentElement.parentElement; // getting parent data

  var index = row.rowIndex - 1; //getting index of data

  var dataLocal = JSON.parse(localStorage.getItem("MyList")); //find the array from local storage

  var obj_index = dataLocal[index]; //find the obj from local storage of that index

  var modal = document.getElementById("myModal");
  var modaltable = document.getElementById("modalTable");

  var row = modaltable.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = obj_index.meal_type;
  cell2.innerHTML = obj_index.calories;
  cell3.innerHTML = obj_index.description;
  cell4.innerHTML = obj_index.time;

  modal.classList.toggle("show-modal");
  //  modal.style.display = "block";
}

//---------------------------- close the modal--------------------
closeButton.onclick = function () {
  // modal.style.display = "none";
  modal.classList.toggle("show-modal");
  //delete previous row
  document.getElementById("modalTable").deleteRow(1);
};

//-----------------code for delete button in a table----------------------------------
function onDelete(td) {
  row = td.parentElement.parentElement; //find row
  var index = row.rowIndex - 1; //find the index of the row
  var dataLocal = JSON.parse(localStorage.getItem("MyList")); //find the array from local storage
  var objLocal = dataLocal[index]; //find the obj from local storage of that index
  dataLocal.splice(objLocal, 1); // remove that perticular index entry
  localStorage.setItem("MyList", JSON.stringify(dataLocal)); //save getdata back to local storage
  document.getElementById("tb").deleteRow(row.rowIndex); //delete row from UI
}

//-------------------------code for reset button---------------------
var btnClear = document.getElementById("btn3");

btnClear.addEventListener("click", resetform);
function resetform() {
  document.getElementById("myform").reset();
}
