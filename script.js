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
var current_price;
var list_of_keys_in_objects = [];
var list_of_keys_in_nested_objects = [];
var list_of_nested_dict_values = [];
var current_dict;
var temp_dict_without_price;


//inputter through alerts
function alert_adder(){
  while (true == true){
    done = false
    temp_holder_to_move_to_main_dict = {};
    object_name = prompt("object name");
    if(!object_name){
      break
    }
    if (object_name == "q" || object_name == "qq"){

      break
    }

    while (true == true){
      task_name = prompt("task name")
      if(!task_name){
        break
      }

      if (task_name == "qq"){
        done = true;
        break;
      }
      else if (task_name == 'q'){
        break;
      }

      input_key = prompt("rating")
      if(!input_key){
        break
      }

      if (input_key == "qq"){
        done = true;
        break;
      }
      else if (input_key == 'q'){
        break;
      }
      temp_holder_to_move_to_main_dict[task_name] = input_key

    }

    objests[object_name] = temp_holder_to_move_to_main_dict

    if (done == true){
      break
    }

  }


}

function alert_update(){
  alert_adder()

  console.log(objests)
  document.getElementById("display").innerHTML = '<br><br>' + JSON.stringify(objests)

}






function update_table(){
  //updating table displayer
  delete temp_dict_without_price.price;
  document.getElementById("table").innerHTML += '<tr><td>'+ list_of_keys_in_objects[list_of_keys_in_objects.length - 1] + '</td>' + '<td>' + current_price + '</td>' + '<td>'+  JSON.stringify(temp_dict_without_price) +'</td>' + '</tr>';
  /*
  for (j=0; j < objests.keys(list_of_keys_in_objects[list_of_keys_in_objects.length - 1]).length; j++){
    document.getElementById("table").innerHTML += '<td>'+  list_of_keys_in_nested_objects[j] + '</td>' + '<td>'+  list_of_nested_dict_values[j] + '</td>' + '</tr>'



  }
  */




}
window.onload = function() {
    //when a form is submitted it calls valid form
    document.forms[0].onsubmit = validForm;
}

function validForm() {
  //the incrementing
  where_at++;
  if(where_at == 5){
    productid++;
    where_at = 1
  }
  //getting the entire node list
	var allTags = document.forms[0].getElementsByTagName("*");

  //searching for the value node
	for (var i=0; i<allTags.length; i++) {
    current_value_from_node = allTags[i].value

    //if node is found and it meets condition then u register the submit at do something with it
    if (current_value_from_node != undefined && current_value_from_node != "" && current_value_from_node != "Submit" && allow){
      console.log(temp_holder_to_move_to_main_dict)
      console.log("thistag: ",current_value_from_node)

      //if user quits and it is not on the main menu
      if(current_value_from_node == "q" && where_at != 1){
        //changing the label
        document.getElementById("descript").innerHTML = 'object <input type="text" id="passwd2" class="reqd passwd1">'

        //adding the new product
        objests[hold + productid] = temp_holder_to_move_to_main_dict

        console.log("objests: " + JSON.stringify(objests))

        //reseting the temp holder


        //updating non-table displayer
        document.getElementById("display").innerHTML = '<br><br>' + JSON.stringify(objests)

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
          current_price = current_value_from_node

          //changing the label
          document.getElementById("descript").innerHTML = 'task: <input type="text" id="passwd2" class="reqd passwd1">'

        }
        if (where_at == 3){
          hold_task = current_value_from_node
          document.getElementById("descript").innerHTML = 'rating: <input type="text" id="passwd2" class="reqd passwd1">'

        }
        if (where_at == 4){
          temp_holder_to_move_to_main_dict["price"] = current_price

          //adding main key name for later use
          list_of_keys_in_objects.push(hold)

          //adding main key name for later use
          list_of_keys_in_nested_objects.push(hold_task)

          //adding value for later user
          list_of_nested_dict_values.push(current_value_from_node)
          //updating temp holder
          temp_holder_to_move_to_main_dict[hold_task] = current_value_from_node
          temp_dict_without_price = temp_holder_to_move_to_main_dict

          where_at = 2
          //changing the label
          document.getElementById("descript").innerHTML = 'task: <input type="text" id="passwd2" class="reqd passwd1">'
        }

      }
    }
	}
}
