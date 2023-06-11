let popup = document.getElementById("popup");
let blur = document.getElementById("blured");
let btn = document.getElementById("deletebtn");
let showCard = document.getElementById("showdet");
var selectedRow = null;
let dataRcd = document.getElementById("records");

var crlnameElement = document.getElementById("intname");

var randomColor = getRandomColor();

crlnameElement.style.backgroundColor = randomColor;

function openPopup(){
    resetForm();
    popup.classList.add("open_popup");
    blured.classList.add("blur_cont");
}

function closePopup(){
    popup.classList.remove("open_popup");
    blured.classList.remove("blur_cont");
}



function formvalidate(){
    isvalid = false;
    myname = false;
    myemail = false;
    myphone = false;
    mycompany = false;
    myaddress = false;

    
    if(nameCheck()){
        myname = true;
    }
    console.log(myname);

    if(emailCheck()){
        myemail = true;
    }
    console.log(myemail);

    if(phoneCheck()){
        myphone = true;
    }
    console.log(myphone);

    if(companyCheck()){
        mycompany = true;
    }
    console.log(mycompany);

    if(addressCheck()){
        myaddress = true;
    }
    console.log(myaddress);

    

    if(myname && myemail && myphone && mycompany && myaddress){
        console.log(isvalid);
        isvalid = true;
        console.log(isvalid);
    }
    

    return isvalid;
}

function nameCheck(){
    myname1 = true;
    let name = document.getElementById("name");

    if(name.value==""){
        myname1 = false;
        document.getElementById("input1").innerHTML = "Name is required";
    }
    else{
        let myname = /^[A-Za-z][A-Za-z\s]*$/;
        if(name.value.match(myname)){
            document.getElementById("input1").innerHTML = "";
            myname1 = true;
        }
        else{
            document.getElementById("input1").innerHTML = "Incorrect name";
            myname1 = false;
        }
    }

    return myname1;
}

function emailCheck(){
    myemail1 = true;
    let email = document.getElementById("email");

    if(email.value==""){
        myemail1 = false;
        document.getElementById("input2").innerHTML = "Email is required";
    }
    else{
        let myemail2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.value.match(myemail2)){
            document.getElementById("input2").innerHTML = "";
            myemail1 = true;
        }
        else{
            document.getElementById("input2").innerHTML = "Incorrect email";
            myemail1 = false;
        }
    }

    return myemail1;
}

function phoneCheck(){
    myphone1 = true;
    let phone = document.getElementById("phone");

    if(phone.value==""){
        myemail1 = false;
        document.getElementById("input3").innerHTML = "Phone is required";
    }
    else{
        var phoneno = /^\d{10}$/;
        if(phone.value.match(phoneno)){
            document.getElementById("input3").innerHTML = "";
            myphone1 = true;
        }
        else{
            document.getElementById("input3").innerHTML = "Phone no. should be of 10 digits";
            myphone1 = false;
        }
    }

    return myphone1;
}

function companyCheck(){
    let cname = document.getElementById("cname");
    mycompany1 = true;

    if(cname.value==""){
        mycompany1 = false;
        document.getElementById("input4").innerHTML = "Company name is required";
    }
    else{
        mycompany1 = true;
        document.getElementById("input4").innerHTML = "";
    }
    return mycompany1;
}

function addressCheck(){
    let address = document.getElementById("address");
    myaddress1 = true;

    if(address.value==""){
        myaddress1 = false;
        document.getElementById("input5").innerHTML = "Address is required";
    }
    else{
        myaddress1 = true;
        document.getElementById("input5").innerHTML = "";
    }

    return myaddress1;
}





function onFormSubmit()
{
    if(formvalidate()){

        var formData = readFormData();
        if(selectedRow == null){
            var initial = getFirstLetters(formData.name);
            insertNewRecord(formData,initial);
        }
        else{
            var initial = getFirstLetters(formData.name);
            updateRecord(formData,initial);
        }
    }

}

function readFormData(){
    var formData = {};

    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["cname"] = document.getElementById("cname").value;
    formData["address"] = document.getElementById("address").value;

    return formData;
}

function insertNewRecord(data,initial) {
    
    var table = document.getElementById("namelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = '<input type="radio" name="chkbox" onclick="onCardfill(this)">';
    var cell2 = newRow.insertCell(1)
        cell2.innerHTML = '<div style="padding:10px;background-color:' + getRandomColor() + '; border-radius:30px; margin:0; font-size:20px; text-align:center; color:white" id="op1">' + initial + '</div>';
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.name;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.email;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.phone;
    var cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.cname;
    var cell7 = newRow.insertCell(6);
        cell7.innerHTML = data.address;

    rowEleCount();

    hideCol();

    btn.classList.add("del_btn");
    updateSearch();
    dataRcd.classList.add("data_rcd");
    popup.classList.remove("open_popup");
    blured.classList.remove("blur_cont");
    resetForm();
}

function getFirstLetters(firstLetters){
    const words = firstLetters.split(" ");
    const initials = words.map(word => word.charAt(0).toUpperCase());
    return initials.join("");
}

function hideCol() {
    var columnsToHide = [4, 5, 6];


    var table = document.getElementById("namelist");

    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    for (var j = 0; j < columnsToHide.length; j++) {
        var columnIndex = columnsToHide[j];
        if (cells.length > columnIndex) {
        cells[columnIndex].style.display = "none";
        }
    }
    }
}

function onCardfill(td)
{
    showCard.classList.add("show_card");

    selectedRow = td.parentElement.parentElement;

    document.getElementById("intname").innerHTML = getFirstLetters(selectedRow.cells[2].innerHTML);

    document.getElementById("fullname1").innerHTML = selectedRow.cells[2].innerHTML;
    document.getElementById("fullname2").innerHTML = selectedRow.cells[2].innerHTML;
    document.getElementById("fullEmail").innerHTML = selectedRow.cells[3].innerHTML;
    document.getElementById("fullPhone").innerHTML = selectedRow.cells[4].innerHTML;
    document.getElementById("fullCompany").innerHTML = selectedRow.cells[5].innerHTML;
    document.getElementById("fullAddress").innerHTML = selectedRow.cells[6].innerHTML;
}

function onFormFill(td){

    popup.classList.add("open_popup");
    blured.classList.add("blur_cont");
    document.getElementById("name").value = document.getElementById("fullname1").innerHTML;
    document.getElementById("email").value = document.getElementById("fullEmail").innerHTML;
    document.getElementById("phone").value = document.getElementById("fullPhone").innerHTML;
    document.getElementById("cname").value = document.getElementById("fullCompany").innerHTML;
    document.getElementById("address").value = document.getElementById("fullAddress").innerHTML;
}



function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cname").value = "";
    document.getElementById("address").value = "";

    selectedRow = null;
}

function updateRecord(data,initial){

    console.log("Good");

    selectedRow.cells[0].innerHTML = '<input type="radio" name="chkbox" onclick="onCardfill(this)" onchange="selectRow(this)">';

    selectedRow.cells[1].innerHTML = '<div style="padding:10px;background-color:' + getRandomColor() + '; border-radius:30px; margin:0; font-size:20px; text-align:center; color:white" id="op1">' + initial + '</div>';
    selectedRow.cells[2].innerHTML = data.name;
    selectedRow.cells[3].innerHTML = data.email;
    selectedRow.cells[4].innerHTML = data.phone;
    selectedRow.cells[5].innerHTML = data.cname;
    selectedRow.cells[6].innerHTML = data.address;

    document.getElementById("intname").innerHTML = getFirstLetters(selectedRow.cells[2].innerHTML);

    document.getElementById("fullname1").innerHTML = selectedRow.cells[2].innerHTML;
    document.getElementById("fullname2").innerHTML = selectedRow.cells[2].innerHTML;
    document.getElementById("fullEmail").innerHTML = selectedRow.cells[3].innerHTML;
    document.getElementById("fullPhone").innerHTML = selectedRow.cells[4].innerHTML;
    document.getElementById("fullCompany").innerHTML = selectedRow.cells[5].innerHTML;
    document.getElementById("fullAddress").innerHTML = selectedRow.cells[6].innerHTML;

    hideCol();

    showCard.classList.remove("show_card");
    popup.classList.remove("open_popup");
    blured.classList.remove("blur_cont");
    resetForm();

}

function selectRow(radioButton) {
  var row = radioButton.parentNode.parentNode;
  if (selectedRow) {
    selectedRow.classList.remove("selected");
  }
  row.classList.add("selected");
  selectedRow = row;
}

function deleteRow() {
  if (selectedRow) {
    var table = document.getElementById("namelist"); 
   
    table.deleteRow(selectedRow.rowIndex);
    selectedRow = null;

    document.getElementById("intname").innerHTML = "";
    document.getElementById("fullname1").innerHTML = "";
    document.getElementById("fullname2").innerHTML = "";
    document.getElementById("fullEmail").innerHTML = "";
    document.getElementById("fullPhone").innerHTML = "";
    document.getElementById("fullCompany").innerHTML = "";
    document.getElementById("fullAddress").innerHTML = "";

    showCard.classList.remove("show_card");
  }

  rowEleCount();
}

function rowEleCount(){
    var table = document.getElementById("namelist");
    var rowCount = table.rows.length; 

    document.getElementById("totRcd").innerHTML = "Records: " + rowCount;
    if(rowCount == 0){
        dataRcd.classList.remove("data_rcd");
        btn.classList.remove("del_btn");
    }
}

function updateSearch() {
    var searchInput = document.getElementById('my_input');
    var table = document.getElementById('namelist');

    searchInput.addEventListener('input', function() {
      var searchValue = this.value.toLowerCase();
      console.log(searchValue);

      for (var i = 0; i < table.rows.length; i++) {
        var name = table.rows[i].cells[2].textContent.toLowerCase();
        console.log(name);

        if (name.includes(searchValue)) {
          table.rows[i].style.display = '';
        } else {
          table.rows[i].style.display = 'none';
        }
      }
    });
  }

  function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  