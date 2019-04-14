//declaring variables
var objests = {};
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
var temp_dict_without_price;
var list_of_nested_dicts_whole = []

function update_table(){
  //updating table displayer



  document.getElementById("table").innerHTML = '<tr><th>Object</th><th>price</th><th>description/extra data</th></tr>'
  var i;
  for (i = 0; i < list_of_keys_in_objects.length ; i++) {

    if(list_of_keys_in_objects[i] != undefined && current_price[i] != undefined && list_of_nested_dicts_whole[i] != undefined){
      console.log("list_of_keys_in_objects: "+ list_of_keys_in_objects[i])
      console.log("current_price: "+ current_price[i])
      console.log("list_of_nested_dicts_whole: "+ list_of_nested_dicts_whole[i])
      document.getElementById("table").innerHTML +=  '<tr><td>'+ list_of_keys_in_objects[i] + '</td>'+    '<td>' + current_price[i]+ '</td>' + '<td>'+  list_of_nested_dicts_whole[i] +'</td>' + '</tr>';

    }




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
  productid++;
  if(where_at == 5){

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
        delete temp_dict_without_price.price;
        list_of_nested_dicts_whole.push(JSON.stringify(temp_dict_without_price))
        document.getElementById("descript").innerHTML = 'object '

        //adding the new product
        objests[hold] = temp_holder_to_move_to_main_dict

        console.log("objests: " + JSON.stringify(objests))

        //reseting the temp holder


        //updating non-table displayer
        document.getElementById("display").innerHTML = JSON.stringify(objests)
        where_at = 0
        //calling table displayer
        update_table()
        temp_holder_to_move_to_main_dict = {}
      }
      else{
        //if user does not quit
        if (where_at == 1){
            hold = current_value_from_node + productid
            //changing the label
            document.getElementById("descript").innerHTML = 'Price: '

        }
        if (where_at == 2){
          current_price.push(current_value_from_node)

          //changing the label
          document.getElementById("descript").innerHTML = 'task: '

        }
        if (where_at == 3){
          hold_task = current_value_from_node
          document.getElementById("descript").innerHTML = 'rating: '

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

          //to stop linking between the 2 objects
          temp_dict_without_price = JSON.parse(JSON.stringify(temp_holder_to_move_to_main_dict));



          where_at = 2
          //changing the label
          document.getElementById("descript").innerHTML = 'task: '
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
      list_of_keys_in_nested_objects.splice(list_of_keys_in_nested_objects.indexOf(current_value_from_node), 1)
      current_price.splice(current_price.indexOf(current_value_from_node), 1)
      list_of_keys_in_objects.splice(list_of_keys_in_objects.indexOf(current_value_from_node), 1)
      list_of_nested_dict_values.splice(list_of_nested_dict_values.indexOf(current_value_from_node), 1)
      list_of_nested_dicts_whole.splice(list_of_nested_dicts_whole.indexOf(current_value_from_node), 1)


      console.log(JSON.stringify(objests))
      update_table()
      //updating non-table displayer
      document.getElementById("display").innerHTML = JSON.stringify(objests)
    }

  }
}
