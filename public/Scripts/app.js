// IIFE -- Immediately Invoked Function Expression
(function(){

   

    function Conform_Delete()
    {
       return conform("Are You Sure Want to Delete?");
    }

    function Start()
    {
        console.log("App Started...");
    }

    window.addEventListener("load", Start);

})();

function deleteUser(id){
    if(confirm("Do you want to delete"))
    {
        window.location.href = "/buisiness-contact/delete/"+id;
    }
    
}

// document.getElementsByClassName("delete").addEventListener("click", function(event){
//     event.preventDefault() 

//     alert("Hiii");
//   });