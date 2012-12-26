// Bracket Selection Functionality 

$(document).ready(function(){
  var region = $('#region').val();;
  //$(".statusBox").hide();
  loadTeams(region);
  loadSaved(region);

  $('div.pickableTeam').live('click', selectTeam);
    
	// activate a hover and fade in statcast icon
  $('.teamContainer').hover(function(){
		if($(this).html() != ''){
            if($(window).width() > 479) {
                $(this).addClass('conHover');
            }
			//$(this).addClass('conHover');
		}
  }, function(){
		$(this).removeClass('conHover');

  }); // end hover
  
   
  $("#tb-score").live('keyup', updateStatusBar);
  $("#tb-rebounds").live('keyup', updateStatusBar);

  $("#submit-button").live('click', function(e){
  	e.preventDefault();
  	submitPicks();
  });
    

});


function selectTeam(e,ui){
	
	if(!$(this).parent().hasClass('conClicked')) {

		$(this).parent().addClass('conClicked');

		//$(this).parent().addClass('conSelected');

 		var teamContainer = '';
	  var advanced_location = 0;

  	var team_seed   = $(('div.seed'), this).html();
	  var team_id     = $(this).attr('rel');

  	var location_id = parseInt($(this).next('div.location_id').html());
	  var team_name   = $(('div.team'), this).html();
  	var slide_direction = 'left';
  
	  if(location_id < 65){
    	advanced_location = 64 + Math.ceil( (parseInt(location_id) / 2) );
  	  if(location_id > 32){ slide_direction = 'right'; }
	  } else if(location_id < 97){
    	advanced_location = 96 + Math.ceil( ((parseInt(location_id) - 64) / 2) );
  	  if(location_id > 80){ slide_direction = 'right'; }
	  }else if(location_id < 113){
    	advanced_location = 112 + Math.ceil( ((parseInt(location_id) - 96) / 2) );
  	  if(location_id > 104){ slide_direction = 'right'; }
	  }else if(location_id < 121){
    	advanced_location = 120 + Math.ceil( ((parseInt(location_id) - 112) / 2) );
  	  if(location_id > 116){ slide_direction = 'right'; }
	  }else if(location_id < 125){
    	advanced_location = 124 + Math.ceil( ((parseInt(location_id) - 120) / 2) );
  	  if(location_id > 122){ slide_direction = 'right'; }
	  }else if(location_id < 127){
    	advanced_location = 126 + Math.ceil( ((parseInt(location_id) - 124) / 2) );
  	  if(location_id > 125){ slide_direction = 'right'; }
	  }

  	var region = parseInt($('#region').attr('value'));

	  if(region != 64){
  	  slide_direction = 'left';
	  }

  	teamContainer += '	<div class="pickableTeam" rel='+ team_id+'>'; 
	  teamContainer += '		<div class="seed">' + team_seed + '</div>';
  	teamContainer += '		<div class="team">' + team_name + '</div>';
	  teamContainer += '	</div>';
  	teamContainer += '	<div class="location_id">' + advanced_location + '</div>';
	  teamContainer += '	<input type="hidden" name="loc' + advanced_location + 'id" id="loc' + advanced_location + 'id" value="' + team_id + '" class="hiddenPicks" />';

		var prev_team_id =	$('#location' + advanced_location + ' div.pickableTeam').attr('rel');

	  $('#location' + advanced_location).html(teamContainer).addClass('teamContainerBG');

		// Clear Mismatched Advances 
	  var search_location = parseInt(advanced_location);
  	if(search_location < 97){
	    location_to_clear = 96 + Math.ceil( (search_location - 64) / 2);
			search_location = clearTeam(prev_team_id, location_to_clear, search_location, opponent_location);
	  }
	  if(search_location < 113){
    	location_to_clear = 112 + Math.ceil( (search_location - 96) / 2) ;
			search_location = clearTeam(prev_team_id, location_to_clear, search_location, opponent_location);
	  }
  	if(search_location < 121){
	    location_to_clear = 120 + Math.ceil( (search_location - 112) / 2);
			search_location = clearTeam(prev_team_id, location_to_clear, search_location, opponent_location);
  	}
  	if(search_location < 125){
	    location_to_clear = 124 + Math.ceil( (search_location - 120) / 2);
			search_location = clearTeam(prev_team_id, location_to_clear, search_location, opponent_location);
  	}
	  if(search_location < 127){
    	location_to_clear = 126 + Math.ceil( (search_location - 124) / 2);
			search_location = clearTeam(prev_team_id, location_to_clear, search_location, opponent_location);
	  }

		
		// remove selected state from game looser
		if (location_id%2 == 0) {
			var opponent_location = location_id - 1;
		} else {
			var opponent_location = location_id + 1;
		}
		//$('#location' + opponent_location).removeClass('conSelected');
		$('#location' + opponent_location).removeClass('conClicked');
		$('#location' + advanced_location).removeClass('conClicked');
	
		// process advancements you have already determined are losers 
		if (advanced_location%2 == 0) {
			var advanced_opponent_location = advanced_location - 1;
		} else {
			var advanced_opponent_location = advanced_location + 1;
		}

		//if(!$('#location' + advanced_opponent_location).hasClass('conClicked')) {
			//$('#location' + advanced_location).addClass('conSelected'); 
		//}
		$('.statusBox').slideDown(250);
		updateStatusBar();

	} // endif hasSelected

} // end select Team





function clearTeam(team_id, location_to_clear, search_location, opponent_location){
		if (search_location%2 == 0) {
			var opponent_location = search_location - 1;
		} else {
			var opponent_location = search_location + 1;
		}

/*		if(!$('#location' + opponent_location).hasClass('conSelected')) {
			$('#location' + opponent_location).removeClass('conSelected');

			if( $('#location' + opponent_location).html() != ''  ) {
				$('#location' + opponent_location).addClass('conSelected');
			}
		}*/
		
	if( (team_id) && (team_id === $('#location'+location_to_clear+' div.pickableTeam').attr('rel')) ){
		// add effect later?
		$('#location'+location_to_clear).html('').removeClass('teamContainerBG');
		/*.removeClass('conSelected');*/
		return location_to_clear;
	}
}

function updateStatusBar(){
  var num_tiebreakers = 0;
  var percent_done = 0;
  var tb_score = $("#tb-score").attr('value');
  var tb_rebounds = $("#tb-rebounds").attr('value');
  var total_picks = parseInt($("#totalPicks").html());

  var seeds_offset = 64;
  var total_pixels = document.getElementById('progBar').offsetWidth;


  var complete_picks = 0;
  
  if(tb_score && parseInt(tb_score) > 0){
    num_tiebreakers++;
  }
  if(tb_rebounds && parseInt(tb_rebounds) > 0){
    num_tiebreakers++;
  }
  
  percent_done = (($('.seed').size() - seeds_offset) * 15) + Math.ceil(num_tiebreakers * 4.5);

  if(total_picks === 15){
    seeds_offset = 16;
    total_pixels = 607;
    percent_done = Math.floor(($('.seed').size() - seeds_offset) * 40) + Math.ceil(num_tiebreakers * 3.5);
  }
  if(total_picks === 3){
    seeds_offset = 4;
    total_pixels = 624;
    percent_done = Math.floor(($('.seed').size() - seeds_offset) * 200) + Math.ceil(num_tiebreakers * 12);
  }
  
  complete_picks = $('.seed').size() - seeds_offset;
  if(percent_done < 0){percent_done = 0;}
  if(complete_picks < 0){complete_picks = 0;}

	var totalPicks =  parseInt($("#totalPicks").html());

 
  $('#completePicks').html( complete_picks );
  $('#completeTiebreakers').html( num_tiebreakers );
  $('.percentage').css('left', percent_done);

	if (complete_picks >= totalPicks){
		$('#printBracket').show(0);
	} else {
		$('#printBracket').hide(0);
	}

  
  if( (percent_done > 0) && (percent_done >= total_pixels) ){
    $('.progressBar span').css('background-color', '#009900');
  }else{
    $('.progressBar span').css('background-color', '#1aa14a');
  }

}


function loadSaved(region){
  var t = Math.random();
  var round_id = 0;
  round_id = $('#round_id').attr('value');

  $.ajaxSetup({ cache: false });
  $.getJSON('/api/bracketPicks.json?round_id=' + round_id, function(data, textStatus){
    $.each(data, function(id, pick){
      var location_id = pick['location_id'];
      var team_id     = pick['team_id'];
      var team_name   = pick['name'];
      var team_seed   = pick['seed'];
      
      var teamContainer = '';
      teamContainer += '	<div class="pickableTeam" rel='+ team_id+'>'; 
      teamContainer += '		<div class="seed">' + team_seed + '</div>';
      teamContainer += '		<div class="team">' + team_name + '</div>';
      teamContainer += '	</div>';
      teamContainer += '	<div class="location_id">' + location_id + '</div>';
      teamContainer += '	<input type="hidden" name="loc' + location_id + 'id" id="loc' + location_id + 'id" value="' + team_id + '" class="hiddenPicks" />';
      $('#location'+pick['location_id']).addClass('teamContainerBG').html(teamContainer);

    });
    setTimeout("updateStatusBar()", 300);
  });
}



function loadTeams(region){
	var t = Math.random();
	var bracket_round = 0;
  bracket_round = $('#bracket_round').attr('value');
  var round_id = 0;
  round_id = $('#round_id').attr('value');
	
	// SIMULATE JSON RESPONSE DATA
/*	var simData = '[{"location_id":"1","team_id":"96","seed":"1","name":"Kansas"},{"location_id":"2","team_id":"259","seed":"16","name":"Lehigh"},{"location_id":"3","team_id":"216","seed":"8","name":"UNLV"},{"location_id":"4","team_id":"207","seed":"9","name":"Northern Iowa"},{"location_id":"5","team_id":"85","seed":"5","name":"Michigan St."},{"location_id":"6","team_id":"344","seed":"12","name":"New Mexico St."},{"location_id":"7","team_id":"29","seed":"4","name":"Maryland"},{"location_id":"8","team_id":"128","seed":"13","name":"Houston"},{"location_id":"9","team_id":"265","seed":"6","name":"Tennessee"},{"location_id":"10","team_id":"214","seed":"11","name":"San Diego St."},{"location_id":"11","team_id":"51","seed":"3","name":"Georgetown"},{"location_id":"12","team_id":"182","seed":"14","name":"Ohio"},{"location_id":"13","team_id":"101","seed":"7","name":"Oklahoma St."},{"location_id":"14","team_id":"28","seed":"10","name":"Georgia Tech"},{"location_id":"15","team_id":"89","seed":"2","name":"Ohio St."},{"location_id":"16","team_id":"113","seed":"15","name":"UC Santa Barb."},{"location_id":"17","team_id":"61","seed":"1","name":"Syracuse"},{"location_id":"18","team_id":"9","seed":"16","name":"Vermont"},{"location_id":"19","team_id":"329","seed":"8","name":"Gonzaga"},{"location_id":"20","team_id":"27","seed":"9","name":"Florida St."},{"location_id":"21","team_id":"149","seed":"5","name":"Butler"},{"location_id":"22","team_id":"137","seed":"12","name":"UTEP"},{"location_id":"23","team_id":"266","seed":"4","name":"Vanderbilt"},{"location_id":"24","team_id":"236","seed":"13","name":"Murray St."},{"location_id":"25","team_id":"23","seed":"6","name":"Xavier"},{"location_id":"26","team_id":"87","seed":"11","name":"Minnesota"},{"location_id":"27","team_id":"55","seed":"3","name":"Pittsburgh"},{"location_id":"28","team_id":"310","seed":"14","name":"Oakland"},{"location_id":"29","team_id":"211","seed":"7","name":"BYU"},{"location_id":"30","team_id":"261","seed":"10","name":"Florida"},{"location_id":"31","team_id":"97","seed":"2","name":"Kansas St."},{"location_id":"32","team_id":"328","seed":"15","name":"North Texas"},{"location_id":"33","team_id":"263","seed":"1","name":"Kentucky"},{"location_id":"34","team_id":"38","seed":"16","name":"East Tenn. St."},{"location_id":"35","team_id":"103","seed":"8","name":"Texas"},{"location_id":"36","team_id":"35","seed":"9","name":"Wake Forest"},{"location_id":"37","team_id":"21","seed":"5","name":"Temple"},{"location_id":"38","team_id":"161","seed":"12","name":"Cornell"},{"location_id":"39","team_id":"92","seed":"4","name":"Wisconsin"},{"location_id":"40","team_id":"283","seed":"13","name":"Wofford"},{"location_id":"41","team_id":"53","seed":"6","name":"Marquette"},{"location_id":"42","team_id":"251","seed":"11","name":"Washington"},{"location_id":"43","team_id":"213","seed":"3","name":"New Mexico"},{"location_id":"44","team_id":"66","seed":"14","name":"Montana"},{"location_id":"45","team_id":"25","seed":"7","name":"Clemson"},{"location_id":"46","team_id":"98","seed":"10","name":"Missouri"},{"location_id":"47","team_id":"63","seed":"2","name":"West Virginia"},{"location_id":"48","team_id":"196","seed":"15","name":"Morgan St."},{"location_id":"49","team_id":"26","seed":"1","name":"Duke"},{"location_id":"50","team_id":"81","seed":"16","name":"Ark. Pine Bluff"},{"location_id":"51","team_id":"245","seed":"8","name":"California"},{"location_id":"52","team_id":"52","seed":"9","name":"Louisville"},{"location_id":"53","team_id":"102","seed":"5","name":"Texas A&M"},{"location_id":"54","team_id":"346","seed":"12","name":"Utah State"},{"location_id":"55","team_id":"91","seed":"4","name":"Purdue"},{"location_id":"56","team_id":"175","seed":"13","name":"Siena"},{"location_id":"57","team_id":"54","seed":"6","name":"Notre Dame"},{"location_id":"58","team_id":"121","seed":"11","name":"Old Dominion"},{"location_id":"59","team_id":"93","seed":"3","name":"Baylor"},{"location_id":"60","team_id":"290","seed":"14","name":"Sam Houston St."},{"location_id":"61","team_id":"17","seed":"7","name":"Richmond"},{"location_id":"62","team_id":"337","seed":"10","name":"St. Mary\'s (CA)"},{"location_id":"63","team_id":"62","seed":"2","name":"Villanova"},{"location_id":"64","team_id":"226","seed":"15","name":"Robert Morris"}]';
	if(region == '16') {
	if(region == '4') { 
		// SIMULATE JSON RESPONSE DATA -- 4
		var simData = '[{"location_id":"121","team_id":"85","seed":"5","name":"Michigan St."},{"location_id":"122","team_id":"149","seed":"5","name":"Butler"},{"location_id":"123","team_id":"63","seed":"2","name":"West Virginia"},{"location_id":"124","team_id":"26","seed":"1","name":"Duke"}]';

	} else if(region == '16') {
		// SIMULATE JSON RESPONSE DATA -- 16
		var simData = '[{"location_id":"97","team_id":"207","seed":"9","name":"Northern Iowa"},{"location_id":"98","team_id":"85","seed":"5","name":"Michigan St."},{"location_id":"99","team_id":"265","seed":"6","name":"Tennessee"},{"location_id":"100","team_id":"89","seed":"2","name":"Ohio St."},{"location_id":"101","team_id":"61","seed":"1","name":"Syracuse"},{"location_id":"102","team_id":"149","seed":"5","name":"Butler"},{"location_id":"103","team_id":"23","seed":"6","name":"Xavier"},{"location_id":"104","team_id":"97","seed":"2","name":"Kansas St."},{"location_id":"105","team_id":"263","seed":"1","name":"Kentucky"},{"location_id":"106","team_id":"161","seed":"12","name":"Cornell"},{"location_id":"107","team_id":"251","seed":"11","name":"Washington"},{"location_id":"108","team_id":"63","seed":"2","name":"West Virginia"},{"location_id":"109","team_id":"26","seed":"1","name":"Duke"},{"location_id":"110","team_id":"91","seed":"4","name":"Purdue"},{"location_id":"111","team_id":"93","seed":"3","name":"Baylor"},{"location_id":"112","team_id":"337","seed":"10","name":"St. Mary\'s (CA)"}]';

	} else {

		// SIMULATE JSON RESPONSE DATA -- 64
		var simData = '[{"location_id":"1","team_id":"96","seed":"1","name":"Kansas"},{"location_id":"2","team_id":"259","seed":"16","name":"Lehigh"},{"location_id":"3","team_id":"216","seed":"8","name":"UNLV"},{"location_id":"4","team_id":"207","seed":"9","name":"Northern Iowa"},{"location_id":"5","team_id":"85","seed":"5","name":"Michigan St."},{"location_id":"6","team_id":"344","seed":"12","name":"New Mexico St."},{"location_id":"7","team_id":"29","seed":"4","name":"Maryland"},{"location_id":"8","team_id":"128","seed":"13","name":"Houston"},{"location_id":"9","team_id":"265","seed":"6","name":"Tennessee"},{"location_id":"10","team_id":"214","seed":"11","name":"San Diego St."},{"location_id":"11","team_id":"51","seed":"3","name":"Georgetown"},{"location_id":"12","team_id":"182","seed":"14","name":"Ohio"},{"location_id":"13","team_id":"101","seed":"7","name":"Oklahoma St."},{"location_id":"14","team_id":"28","seed":"10","name":"Georgia Tech"},{"location_id":"15","team_id":"89","seed":"2","name":"Ohio St."},{"location_id":"16","team_id":"113","seed":"15","name":"UC Santa Barb."},{"location_id":"17","team_id":"61","seed":"1","name":"Syracuse"},{"location_id":"18","team_id":"9","seed":"16","name":"Vermont"},{"location_id":"19","team_id":"329","seed":"8","name":"Gonzaga"},{"location_id":"20","team_id":"27","seed":"9","name":"Florida St."},{"location_id":"21","team_id":"149","seed":"5","name":"Butler"},{"location_id":"22","team_id":"137","seed":"12","name":"UTEP"},{"location_id":"23","team_id":"266","seed":"4","name":"Vanderbilt"},{"location_id":"24","team_id":"236","seed":"13","name":"Murray St."},{"location_id":"25","team_id":"23","seed":"6","name":"Xavier"},{"location_id":"26","team_id":"87","seed":"11","name":"Minnesota"},{"location_id":"27","team_id":"55","seed":"3","name":"Pittsburgh"},{"location_id":"28","team_id":"310","seed":"14","name":"Oakland"},{"location_id":"29","team_id":"211","seed":"7","name":"BYU"},{"location_id":"30","team_id":"261","seed":"10","name":"Florida"},{"location_id":"31","team_id":"97","seed":"2","name":"Kansas St."},{"location_id":"32","team_id":"328","seed":"15","name":"North Texas"},{"location_id":"33","team_id":"263","seed":"1","name":"Kentucky"},{"location_id":"34","team_id":"38","seed":"16","name":"East Tenn. St."},{"location_id":"35","team_id":"103","seed":"8","name":"Texas"},{"location_id":"36","team_id":"35","seed":"9","name":"Wake Forest"},{"location_id":"37","team_id":"21","seed":"5","name":"Temple"},{"location_id":"38","team_id":"161","seed":"12","name":"Cornell"},{"location_id":"39","team_id":"92","seed":"4","name":"Wisconsin"},{"location_id":"40","team_id":"283","seed":"13","name":"Wofford"},{"location_id":"41","team_id":"53","seed":"6","name":"Marquette"},{"location_id":"42","team_id":"251","seed":"11","name":"Washington"},{"location_id":"43","team_id":"213","seed":"3","name":"New Mexico"},{"location_id":"44","team_id":"66","seed":"14","name":"Montana"},{"location_id":"45","team_id":"25","seed":"7","name":"Clemson"},{"location_id":"46","team_id":"98","seed":"10","name":"Missouri"},{"location_id":"47","team_id":"63","seed":"2","name":"West Virginia"},{"location_id":"48","team_id":"196","seed":"15","name":"Morgan St."},{"location_id":"49","team_id":"26","seed":"1","name":"Duke"},{"location_id":"50","team_id":"81","seed":"16","name":"Ark. Pine Bluff"},{"location_id":"51","team_id":"245","seed":"8","name":"California"},{"location_id":"52","team_id":"52","seed":"9","name":"Louisville"},{"location_id":"53","team_id":"102","seed":"5","name":"Texas A&M"},{"location_id":"54","team_id":"346","seed":"12","name":"Utah State"},{"location_id":"55","team_id":"91","seed":"4","name":"Purdue"},{"location_id":"56","team_id":"175","seed":"13","name":"Siena"},{"location_id":"57","team_id":"54","seed":"6","name":"Notre Dame"},{"location_id":"58","team_id":"121","seed":"11","name":"Old Dominion"},{"location_id":"59","team_id":"93","seed":"3","name":"Baylor"},{"location_id":"60","team_id":"290","seed":"14","name":"Sam Houston St."},{"location_id":"61","team_id":"17","seed":"7","name":"Richmond"},{"location_id":"62","team_id":"337","seed":"10","name":"St. Mary\'s (CA)"},{"location_id":"63","team_id":"62","seed":"2","name":"Villanova"},{"location_id":"64","team_id":"226","seed":"15","name":"Robert Morris"}]';
	
	}

	var simJSON = jQuery.parseJSON(simData);

  $.ajaxSetup({ cache: false });
	$.each(simJSON, function(id, team){*/
  $.ajaxSetup({ cache: false });
  $.getJSON('/api/bracketLocation.json?round_id=' + round_id , function(data, textStatus){
    $.each(data, function(id, team){
      var location_id = team['location_id'];
      var team_id     = team['team_id'];
      var team_name   = team['name'];
      var team_seed   = team['seed'];
      
      var teamContainer = '';

      teamContainer += '	<div class="statcast"><a class="fancybox" href="/play/stats?round_id='+round_id+'&team_id='+team_id+'"><div class="statcastGraphic"></div></a></div>';
      teamContainer += '	<div class="pickableTeam" rel='+ team_id+'>'; 
      teamContainer += '		<div class="seed">' + team_seed + '</div>';
      teamContainer += '		<div class="team">' + team_name + '</div>';
      teamContainer += '	</div>';
      //teamContainer += '	<div class="team_id">' + team_id + '</div>';
      teamContainer += '	<div class="location_id">' + location_id + '</div>';
      $('#location'+team['location_id']).html(teamContainer);
    });
    iniFancyBox();
  });

	
}

function iniFancyBox(){
	$("a.fancybox").fancybox({
		overlayOpacity: '0.6',
		overlayColor: '#000'
	});
}                                

function submitPicks(){
	$('.statusBox').hide();
  
  var picksString = '';
  var location_id = 0;
  var team_id = 0;
  var round_id = 0;
  var region = '';
  var tb_score = 0;
  var tb_rebounds = 0;
	var bracket_round = 0;
  round_id = $('#round_id').attr('value');

	var completePicks =  parseInt($("#completePicks").html());
	var totalPicks =  parseInt($("#totalPicks").html());

	if (completePicks < totalPicks){
		// incomplete Bracket
		var error_msgComplete = '	<div class="statusInner gFull center" ><h3>Your bracket is not complete and has not been submitted. </h3>';
		error_msgComplete += '<p>Please ensure that you\'ve completely filled out your bracket and then click on the"Submit My Bracket" button.</p>';
		error_msgComplete += '	</div>';
		$(".statusBox").html(error_msgComplete).removeClass('statusAttention').addClass('statusError');
		$('.statusBox').hide().slideDown(250);
	}
  else if (!$('#tb-score').val().match(/^\d+$/) || !$('#tb-rebounds').val().match(/^\d+$/)) {
    var error_msgComplete = '	<div class="statusInner gFull center" ><h3>Tie breakers must be entered as numbers. </h3>';
		error_msgComplete += '<p>Please ensure that you\'ve entered your tie breakers as numbers only and then click on the"Submit My Bracket" button.</p>';
		error_msgComplete += '	</div>';
		$(".statusBox").html(error_msgComplete).removeClass('statusAttention').addClass('statusError');
		$('.statusBox').hide().slideDown(250);
  }
  else {

		// complete bracket

	  region = $('#region').attr('value');
  	tb_score = $('#tb-score').attr('value');
	  tb_rebounds = $('#tb-rebounds').attr('value');
  
  	round_id = $('#round_id').attr('value');
	  $('.location_id').each(function(id){
  	  location_id = parseInt($(this).html());
    	if(location_id > 64){
	      //team_id = parseInt($(this).siblings('.team_id').html());
  	    team_id = parseInt($('#loc'+location_id+'id').attr('value'));
    	  picksString += location_id + ':' + team_id + ',';
	    }
  	});
  
	  var t = Math.random ();


  	$.ajaxSetup({ cache: false });
	  $.getJSON('/api/saveBracket.json?round_id=' + round_id + '&tb_score=' + tb_score + '&tb_rebounds=' + tb_rebounds + '&picks=' + picksString, function(data){
  	  var success = data[0]['success'];
    	if(success){
    		
	      //$("#error-message").html('Picks Saved SUCCESSFULLY' + success);
  	    var redirect_url = '/play/bracketConfirmation?round_id=' + round_id;
	      window.location = redirect_url;
		
	    }else{
  	    var error_msg = '	<div class="statusInner gFull center" ><h3>ERRORS</h3>';
    	  $.each(data, function(id, error){
      	  var error_text = error['errors'];
        	error_msg += '<p>' + error_text + '</p>'
	      });
  	    error_msg += '	</div>'
    	  $(".statusBox").html(error_msg).removeClass('statusAttention').addClass('statusError');
  			$('.statusBox').hide().slideDown(250);
	    }

		});
	}
	

  
}
