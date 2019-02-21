var techniques = {
//    "recipe 1": ['Buying Pans','Buying a Knife','Video 1'],
    "Steak": ['Buying a Knife','Knife Skills','Buying Pans','Steak Intro','Steak Seasoning','Oiling the Pan','Searing Steak','Steak Turning','Letting Steak Rest','Carving and Plating']
//    "recipe 3": ['Buying a Knife','Knife Skills']
};

var recipes = {
//    "recipe 1": ['1) Do this','2) Do that','3) Measure out 3oz of something and put it in a pot'],
    "Steak": ['1) Aquire two cuts of skirt steak','2) Season the steaks on one side with salt and pepper','3) Heat 1 or 2 tbsp of vegetable oil in a stainless steal or cast iron pan','4) Once the steaks have a nice browning on one side, flip them over','5) Let steaks rest for 10 minutes','6)Carve and serve'],
//    "recipe 3": ['1) Hello','2) World']
};

var recipeselected;

var techniquelist = [];

var selectedtechniques = [];

var videoactive;

var completed = false;

var videos = {
    "Buying a Knife": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY52H2IHabycAiaD1U5zP3cNWefDq_2XVl4E1OCtg0ezsE_YDZ","babish-basics.mp4#t=136,170"],
    "Buying Pans": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOQ4x0dpdZtRgBZVvLcV7C4-6fa4V3qtPrSYbFHLmlA3NSny-","babish-basics.mp4#t=200,241"],
    "Knife Skills": ["https://www.citycookingwestend.com/wp-content/uploads/2017/05/Knife_Skills.jpg","tasty-knife.mp4#t=68,80"],
    "Steak Intro": ["https://www.simplyrecipes.com/wp-content/uploads/2016/05/grilled-skirt-steak-skewers-horiz-c-1600.jpg","babish-steak.mp4#t=51,75"],
    "Steak Seasoning": ["https://www.potterybarn.com/pbimgs/ab/images/dp/wcm/201811/0048/antique-silver-sentiment-salt-pepper-shakers-o.jpg","babish-steak.mp4#t=79,88"],
    "Oiling the Pan": ["https://www.healthline.com/hlcmsresource/images/AN_images/AN220-Olive-Oil-732x549-Thumb.jpg","babish-steak.mp4#t=86,94"],
    "Searing Steak": ["https://www.seriouseats.com/images/2017/02/20170217-reverse-sear-steak-04.jpg","babish-steak.mp4#t=92,104"],
    "Steak Turning": ["https://img.wonderhowto.com/img/80/39/63534532318165/0/perfectly-cooked-steaks-require-more-than-one-flip-heres-why.w1456.jpg","babish-steak.mp4#t=102,123"],
    "Letting Steak Rest": ["http://www.grillingcompanion.com/wp-content/uploads/2015/07/skirt-steak-grilled.jpg","babish-steak.mp4#t=124,139"], 
    "Carving and Plating": ["https://atmedia.imgix.net/5cdc344761c20615ed0543f9615fdda8f169cae3?auto=format&q=45&w=640.0&h=430.0&fit=max&cs=strip","babish-steak.mp4#t=145,162"]
};

function refreshtechniques(){
    $('#techniqueslist').empty();
    techniquelist.forEach(function(element){
        $('#techniqueslist').append('<div class="technique" style="background-image:url('+videos[element][0]+');background-size:cover">'+element+'</div>')
    });
    $(".technique").draggable({revert: "invalid"});
}

function refreshskills(){
    $('#techniqueslist').empty();
    $('#drop-space').empty();
    techniquelist.forEach(function(element){
        $('#techniqueslist').append('<div class="technique" style="background-image:url('+videos[element][0]+');background-size:cover">'+element+'</div>')
    });
    $(".technique").draggable({revert: "invalid"});
    selectedtechniques.forEach(function(element){
        $('#drop-space').append('<div class="selected">'+element+'</div>')
    });
    $(".selected").click(function(){
        if(videoactive){
            $("#video").html("<video loop class=\"technique-vid\" autoplay width=\"100%\" height=\"100%\"><source src=\""+videos[$(this).text()][1]+"\"></video>");
        }
    })
}

function emptyskills(){
    techniquelist = techniques[recipeselected].slice();
    console.log(techniques[recipeselected]);
    selectedtechniques = [];
    refreshtechniques();
    refreshskills();
}

function transferallskills(){
    techniquelist.forEach(function(element){
        selectedtechniques.push(element);
    })
    refreshskills();
    techniquelist = [];
    $('#techniqueslist').empty();
}

function loadrecipesteps(){
    $("#recipesteps").empty();
    recipes[recipeselected].forEach(function(element, index){
        $("#recipesteps").append('<input type="checkbox" value="" id="box-'+index+'"><label for="box-'+index+'"><div class="recipestep">'+element+'</div></label><br>')
    });
    
}


window.setInterval(checkforcompletion, 500);

function checkforcompletion(){
    var numchecked = 0;
    
    var checkedboxes = $(":checkbox:checked");
    
    
    checkedboxes.each(function () {
        numchecked++;
    });
    
    if (numchecked == 6 && !completed){
        $("#recipesteps").append("<div class='congratulations'>Congratulations! You completed your first dish!</div>");
        completed = true;
    }
}

$(document).ready(function(){
    
    videoactive = false;
    
    $("#drop-space").droppable({
        activeClass: "drop-space-active",
        hoverClass: "drop-space-hover",
        drop: function(event,el){
            techniquelist.splice(techniquelist.indexOf($(el.draggable).text()), 1);
            selectedtechniques.push($(el.draggable).text());
            el.draggable.remove();
            refreshskills();
        }
    });
    
    $(".recipebox").click(function() {
        $('#recipes').hide();
        $('#techniques').show();
        $("#sidebar").show();
        recipeselected = $(this).attr('id');
        techniquelist = techniques[recipeselected].slice();
        refreshtechniques();
    });
    
    $("#cleartechs").click(function(){
        emptyskills();
    });
    
    $("#transtechs").click(function(){
        transferallskills();
    })
    
    $("#techs").click(function(){
        loadrecipesteps();
        $("#video-wrapper").hide();
        $("#video").html("Select a video from the sidebar.");
        $("#techniques").show();
        $("#recipedisplay").hide();
        videoactive = false;
    });
    
    $("#go").click(function(){
        $("#techniques").hide();
        $("#recipedisplay").hide();
        $("#video-wrapper").show();
        videoactive = true;
    });
    
    $("#ready").click(function(){
        loadrecipesteps();
        $("#video-wrapper").hide();
        $("#video").html("Select a video from the sidebar.");
        $("#techniques").hide();
        $("#recipedisplay").show();
        videoactive = false;
    });
    
    $("#rewind").click(function(){
        var vidDOM = $(document).find(".technique-vid")[ 0 ];
        vidDOM.currentTime = vidDOM.currentTime - 10;
    });
    
    $("#ff").click(function(){
        var vidDOM = $(document).find(".technique-vid")[ 0 ];
        vidDOM.currentTime = vidDOM.currentTime + 10;
    });
    
    $("#turtle").hover(function(){
        console.log("hover");
        $(document).find(".technique-vid")[ 0 ].playbackRate = 0.5;
    });
    $("#turtle").mouseleave(function(){
        console.log("hover");
        $(document).find(".technique-vid")[ 0 ].playbackRate = 1;
    });
    
    $("#rabbit").hover(function(){
        console.log("hover");
        $(document).find(".technique-vid")[ 0 ].playbackRate = 2;
    });
    $("#rabbit").mouseleave(function(){
        console.log("hover");
        $(document).find(".technique-vid")[ 0 ].playbackRate = 1;
    });
    
    $("#play").click(function(){
        console.log("hover");
        var vidDOM = $(document).find(".technique-vid")[ 0 ];
        if (vidDOM.paused == false) {
              vidDOM.pause();
            $(this).html("<span class=\"glyphicon glyphicon-play\"></span>");
          } else {
              vidDOM.play();
              $(this).html("<span class=\"glyphicon glyphicon-pause\"></span>");
          }

    });
});