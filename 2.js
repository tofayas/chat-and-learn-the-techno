$(document).ready(function(){$("#open").click(function(){$("#ssgs").animate({left:0},"slow");$("#open").fadeOut("speed");$("#close").fadeIn("speed")})});$(document).ready(function(){$("#close").click(function(){$("#ssgs").animate({left:-200},"slow");$("#close").fadeOut("speed");$("#open").fadeIn("speed")})});