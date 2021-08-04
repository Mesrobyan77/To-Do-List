jQuery(document).ready(function($){

	let counter = 0;
	let arr = JSON.parse(localStorage.getItem("text")) || []; 

	function Print(data) {
		if(data.length > 0 ) {
			let row = '';
			data.forEach(function(item,index){
				row += `<li data-id = ${index} class = "checkbox">
					<div class="left" >
						<input type="checkbox" id="check-${index}">
						<label for="check-${index}"></label>
						<span>${item}</span>
					</div>
					<span class="remove"><i class="fas fa-trash"></i></span>
				</li>`
			})
			$('ul').html(row);
		}else {
			$("ul").html("To-Do List is empty");
		}
	}


	Print(arr)

	$(".add").click(function(){ 
		let inpval = $(".form-control").val();
		if(inpval.length > 0) {
			arr.push(inpval);
			$(".form-control").val('');
			localStorage.setItem("text",JSON.stringify(arr)); 
			let x = localStorage.getItem("text");
		 	x = JSON.parse(x);
		 	Print(x);
			counter++;
		}else {
			alert("lracru nor")
		}
	})

	$("ul").on("click", "span", function(event){
		$(this).parent().fadeOut(500,function(){
			$(this).remove(); 
			let delId = parseInt(this.getAttribute("data-id")); 
			arr.splice(delId, 1);
			localStorage.setItem("text",JSON.stringify(arr));
			Print(arr)
		});
	});

	$("ul").on('change','input[type="checkbox"]',function(){
		if ($(this).is(':checked')) {
			$(this).closest("li").children(".remove").addClass("active") 	
		} else  {
			$(this).closest("li").children(".remove").removeClass("active") 
		}
	})
})