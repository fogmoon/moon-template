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
            $(JsMoon.params.notifications.selector).delay(500).slideDown('fast',function(){
                $(this).find('[data-action="close"]').first().click(function(){
                    JsMoon.notifications.blabla($(this)
		        .parent(JsMoon.params.notifications.selector).first());
                });
		$(this).delay(4000).slideUp('fast');
            });

        },
        blabla: function(element)
        {
            element.slideUp('fast');
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
