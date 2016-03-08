$(document).ready( function() {
	var synArray = [];
	var i=0;
        $('#wordfield').bind('keyup', function(e) {
            if (e.which == 32)
	    {
		console.log(i);
                var word = $('#wordfield').val();
		word = word.trim();
		if(word === 'a')
		{
		   $('#buttons').append(" "+word);
		$('#wordfield').val('');
		}
		else if (! /^[a-zA-Z0-9]+$/.test(word)) {
 		   alert("Please make sure there are no extra spaces in the input box :)");
		}
		else
		{
 		var url = "http://words.bighugelabs.com/api/2/24f96f10cfe6f2a8f4842b44ce241c3d/" + word + "/xml";
    		$.ajax({
			type: "GET",
			url: url,
			dataType: "xml",
			success: function(xml)
			{												
  			  console.log(xml);
 			  //Parse XML file
   			  var synonyms = $(xml).find('w').each(function()
			  {
			    //Add to array of synonyms
			    if($(this).attr('r') === 'syn')
			    {
			    synArray.push($(this).text());
			    }
			  });
		         //Choose random synonym
			 if(synArray.length < 2)
			 {
			 $('#buttons').append(word);
			 }
			 else
			 {
			 var rand = Math.floor((Math.random() * 2));
			 var replacement = synArray[rand];
			 $('#buttons').append(replacement);
			 }
			 synArray = [];
			},
			error: function() { 
			 $('#buttons').append(word);
			 synArray = [];
              		}       
   		      });
		$('#wordfield').val('');
		$('#buttons').append(' ');
		i++;
	    }	
	}
    });
  });
	function reset()
	{
	   $('#buttons').empty();
	}
