//declaring variables
var objests = {};
var done;
var object_name;
var task_name;
var input_key;
var allTags;
var where_at = 0;
var current_value_from_node;
var temp_holder_to_move_to_main_dict = {};
var allow = true;
var hold;
var hold_task;
var productid = 0;
var current_price = [];
var list_of_keys_in_objects = [];
var list_of_keys_in_nested_objects = [];
var list_of_nested_dict_values = [];
var current_dict;
var temp_dict_without_price;
var list_of_nested_dicts_whole = []

function update_table(){
  //updating table displayer


  console.log("xde")
  document.getElementById("table").innerHTML = '<tr><th>Object</th><th>price</th><th>description/extra data</th></tr>'
  var i;
  for (i = 0; i < Object.keys(objests).length; i++) {
    console.log("xd")
    document.getElementById("table").innerHTML +=  '<tr><td>'+ list_of_keys_in_objects[i] + '</td>'+    '<td>' + current_price[i]+ '</td>' + '<td>'+  list_of_nested_dicts_whole[i] +'</td>' + '</tr>';
  }
}
window.onload = function() {
    //when a form is submitted it calls valid form

    document.forms[1].onsubmit = validForm2;
    document.forms[0].onsubmit = validForm;
}

function validForm() {
  allow = true
  //the incrementing
  where_at++;
  if(where_at == 5){
    productid++;
    where_at = 1
  }
  console.log("wherat",where_at)
  //getting the entire node list
	allTags = document.forms[0].getElementsByTagName("*");

  //searching for the value node
	for (var i=0; i<allTags.length; i++) {
    current_value_from_node = allTags[i].value

    //if node is found and it meets condition then u register the submit at do something with it
    if (current_value_from_node != undefined && current_value_from_node != "" && current_value_from_node != "Submit" && allow){
      console.log(JSON.stringify(temp_holder_to_move_to_main_dict))
      console.log("thistag: ",current_value_from_node)

      //if user quits and it is not on the main menu
      if(current_value_from_node == "q"){
        //changing the label
        document.getElementById("descript").innerHTML = 'object <input type="text" id="passwd2" class="reqd passwd1">'

        //adding the new product
        objests[hold + productid] = temp_holder_to_move_to_main_dict

        console.log("objests: " + JSON.stringify(objests))

        //reseting the temp holder


        //updating non-table displayer
        document.getElementById("display").innerHTML = '<br><br>' + JSON.stringify(objests)
        where_at = 0
        //calling table displayer
        update_table()
        temp_holder_to_move_to_main_dict = {}
      }
      else{
        //if user does not quit
        if (where_at == 1){
            hold = current_value_from_node
            //changing the label
            document.getElementById("descript").innerHTML = 'Price: <input type="text" id="passwd2" class="reqd passwd1">'

        }
        if (where_at == 2){
          current_price.push(current_value_from_node)

          //changing the label
          document.getElementById("descript").innerHTML = 'task: <input type="text" id="passwd2" class="reqd passwd1">'

        }
        if (where_at == 3){
          hold_task = current_value_from_node
          document.getElementById("descript").innerHTML = 'rating: <input type="text" id="passwd2" class="reqd passwd1">'

        }
        if (where_at == 4){
          temp_holder_to_move_to_main_dict["price"] = current_price[current_price.length - 1]

          //adding main key name for later use
          list_of_keys_in_objects.push(hold)

          //adding main key name for later use
          list_of_keys_in_nested_objects.push(hold_task)

          //adding value for later user
          list_of_nested_dict_values.push(current_value_from_node)
          //updating temp holder
          temp_holder_to_move_to_main_dict[hold_task] = current_value_from_node
          console.log("re",JSON.stringify(temp_holder_to_move_to_main_dict))
          temp_dict_without_price = temp_holder_to_move_to_main_dict
          //delete temp_dict_without_price.price;
          list_of_nested_dicts_whole.push(JSON.stringify(temp_dict_without_price))

          where_at = 2
          //changing the label
          document.getElementById("descript").innerHTML = 'task: <input type="text" id="passwd2" class="reqd passwd1">'
        }

      }
    }
	}
}






function validForm2(){

  allTags = document.forms[1].getElementsByTagName("*");

  //searching for the value node
	for (var i=0; i<allTags.length; i++) {
    current_value_from_node = allTags[i].value
    if (current_value_from_node != undefined && current_value_from_node != "" && current_value_from_node != "Submit"){
      allow = false
      console.log("second",current_value_from_node)
      delete objests[current_value_from_node]
      console.log(JSON.stringify(objests))
      update_table()
    }

  }
}
