/**
 * The moon javascript helpers
 */

;(function($) {
    // declare var in global scope
    window.JsMoon = {};

    JsMoon.run = function()
    {
    	console.log('JsMoon is now running...');
    }

    JsMoon.SUBNAME = {
        myFunction: function()
        {
            console.log('running JsMoon.SUBNAME.myFunction...');
        }
    }
 
})(jQuery);

JsMoon.run(); 