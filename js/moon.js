/**
 * The moon javascript helpers
 */

(function($) {

    window.JsMoon = {};

    JsMoon.params = {
        notifications : {
            selector : '[data-role="notification"]',
            globalStyles : {
                'position' : 'absolute',
                'left' : '0px',
                'top' : '0px',
                'right' : '0px',
                'background-color' : 'rgb(255,150,0)',
                'color' : '#FFF'
            }
        }
    }

    JsMoon.notifications = {
        init: function()
        {

            var selector = JsMoon.params.notifications.selector;
            var styles = JsMoon.params.notifications.globalStyles;
            $(selector).hide().css(styles);
        },
        run: function()
        {
            $(JsMoon.params.notifications.selector).slideDown('slow',function(){
                $(this).find('[data-action="close"]').first().click(function(){
                    JsMoon.notifications.blabla($(this));
                });
            });

        },
        blabla: function(element)
        {
            element.slideUp();
        }
    }

    JsMoon.run = function()
    {
        

    	console.log('JsMoon is now running...');
        JsMoon.notifications.init();
        JsMoon.notifications.run();


    }

    
 
})(jQuery);

JsMoon.run(); 
