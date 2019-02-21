var sales = [
	{
		"client": "Shake Shack",
		"reams": 100
	},
	{
		"client": "Toast",
		"reams": 100
	},
	{
		"client": "Computer Science Department",
		"reams": 100
	}
];

var knownClients = [
      "Shake Shack",
      "Toast",
      "Computer Science Department",
      "Teacher's College",
      "Starbucks",
      "Subsconsious",
      "Flat Top",
      "Joe's Coffee",
      "Max Caffe",
      "Nussbaum & Wu",
      "Taco Bell",
];

var nonPPClist = [
    "Phyllis",
    "Angela",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
];

var PPClist = [];

function refreshSalesList(){
    var table = document.getElementById("sales-table");
    $(table).html("<col style=\"width:30vw\"><col style=\"width:10vw\"><col style=\"width:10vw\">");
    
    for (var i = 0; i < sales.length; i++) {
        var row = table.insertRow(0);
        var client = row.insertCell(0);
        var reams = row.insertCell(1);
        var delbutton = row.insertCell(2);
        client.innerHTML = sales[i]["client"];
        reams.innerHTML = sales[i]["reams"];
        delbutton.innerHTML = "<div class=\"delbutton\" data-element=\"" + i + "\">delete</div>"
    }
    
    $(".delbutton").click(function(){
        sales.splice(this.dataset.element,1);
        refreshSalesList();
    })
};

function refreshPPCList(){
    $("#non-PPC-list").html("");
    $("#PPC-list").html("");
    for (var i = 0; i < nonPPClist.length; i++) {
        $("#non-PPC-list").append("<div class=\"employee\">" + nonPPClist[i] + "</div>");
    }
    for (var i = 0; i < PPClist.length; i++) {
        $("#PPC-list").append("<div class=\"employee\">" + PPClist[i] + "</div>");
    }
    
    $(".employee").draggable({revert: "invalid"});
    
};

$(document).ready(function() {
    
    refreshSalesList();
    refreshPPCList();
    
    $("#PPC-dropspace").droppable({
        activeClass: "dropspace-active",
        hoverClass: "dropspace-hover",
        drop: function(event,el){
            if(PPClist.indexOf($(el.draggable).text()) >= 0){
                PPClist.splice(PPClist.indexOf($(el.draggable).text()), 1);
            }
            if(nonPPClist.indexOf($(el.draggable).text()) >= 0){
                nonPPClist.splice(nonPPClist.indexOf($(el.draggable).text()), 1);
            }
            PPClist.push($(el.draggable).text());
            el.draggable.remove();
            refreshPPCList();
        }
    });
    
    $("#non-PPC-dropspace").droppable({
        activeClass: "dropspace-active",
        hoverClass: "dropspace-hover",
        drop: function(event,el){
            if(PPClist.indexOf($(el.draggable).text()) >= 0){
                PPClist.splice(PPClist.indexOf($(el.draggable).text()), 1);
            }
            if(nonPPClist.indexOf($(el.draggable).text()) >= 0){
                nonPPClist.splice(nonPPClist.indexOf($(el.draggable).text()), 1);
            }
            nonPPClist.push($(el.draggable).text());
            el.draggable.remove();
            refreshPPCList();
        }
    });
    
    var clientfield = $('#client-field');
    var reamsfield = $('#reams-field');
    var submit = $("#submit-button");
    
    $('#client-field').autocomplete({
      source: knownClients
    });
    
    $("#reams-field").keyup(function(event) {
        if (event.keyCode == 13) {
            $(submit).click();
        }
    });
    
    submit.click(function() {
        if(!clientfield.val()){
            alert("Client field is empty!");
            clientfield.focus();
        }
        
        else if(!reamsfield.val()){
            alert("# Reams field is empty!");
            reamsfield.focus();
        }

        if(clientfield.val() && reamsfield.val()){
            var new_row = {};
            new_row["client"] = clientfield.val();
            new_row["reams"] = reamsfield.val();
            sales.push(new_row);
            refreshSalesList();
            clientfield.val("");
            reamsfield.val("");
        }
    });
    
});