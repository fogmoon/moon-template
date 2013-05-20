/**
 * The moon javascript helpers
 */

(function($) {

    window.JsMoon = {};

    JsMoon.params = 
    {
        toggle : 
        {
            selector : 'data-toggle'
        },
        push : 
        {
            selector : 'data-role="push"',
            direction : 'data-push-direction',
            menu : 'data-push-menu'
        },
        side : 
        {
            selector : 'data-role="side"',
            direction : 'data-side-direction',
            menu : 'data-side-menu'
        },
        notifications : 
        {
            selector : '[data-role="notification"]',
            globalStyles : 
            {
                'position' : 'absolute',
                'left' : '0px',
                'top' : '0px',
                'right' : '0px',
            }
        }
    }

    JsMoon.toggle = {
        init: function()
        {
            var selector = JsMoon.params.toggle.selector;
            var elements = $('[' + selector + ']');
            elements.each(function()
            {
                $(this).click(function(){$('#'+ $(this).attr(selector)).slideToggle();});
                $('#'+ $(this).attr(selector)).hide();           
            });
        }
    }
    
    JsMoon.push = {
        init: function()
        {
            $('body').first().addClass('cbp-spmenu-push');
            var selector = JsMoon.params.push.selector;
            var direction = JsMoon.params.push.direction;
            var menu = JsMoon.params.push.menu;
            var elements = $('[' + selector + ']');
            menuElement = $('#'+$(elements).attr(menu));
            menuElement.first().addClass('cbp-spmenu').addClass('cbp-spmenu-vertical').addClass('cbp-spmenu-left');
            menuElement.append('<a data-role="close-push"><i class="icon-arrow-left"></i> Back</a>');
            elements.each(function()
            {
                $(this).click(function(){
                    menuElement = $('#'+$(this).attr(menu));
                    $(this).toggleClass('active');
                    $('body').toggleClass('cbp-spmenu-push-to'+$(this).attr(direction));
                    menuElement.toggleClass('cbp-spmenu-open');
                });
                menuElement.find('a[data-role="close-push"]').click(function(){elements.trigger('click');});

            });
        }
    }

   // Need to be reviewed : directon is on left. Must be left, right, top or bottom ! 
    JsMoon.side = {
        init: function()
        {
            $('body').first().addClass('cbp-spmenu-push');
            var selector = JsMoon.params.side.selector;
            var direction = JsMoon.params.side.direction;
            var menu = JsMoon.params.side.menu;
            var elements = $('[' + selector + ']');
            menuElement = $('#'+$(elements).attr(menu));
            menuElement.first().addClass('cbp-spmenu').addClass('cbp-spmenu-vertical').addClass('cbp-spmenu-left');
            menuElement.append('<a data-role="close-side"><i class="icon-arrow-left"></i> Back</a>');
            elements.each(function()
            {
                $(this).click(function(){
                    menuElement = $('#'+$(this).attr(menu));
                    $(this).toggleClass('active');
                    $('body').toggleClass('cbp-spmenu-side-to'+$(this).attr(direction));
                    menuElement.toggleClass('cbp-spmenu-open');
                });
                menuElement.find('a[data-role="close-side"]').click(function(){elements.trigger('click');});
            });
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
            $(JsMoon.params.notifications.selector).delay(500).slideDown('fast',function()
            {
                    $(this).find('[data-action="close"]').first().click(function()
                    {
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
    JsMoon.scroll = {
        init: function()
        {
            if($.smoothScroll)
            {
                $('a').smoothScroll();
            }
        }
    }

    JsMoon.date = 
    {
        run: function()
        {
            if(moment){
                moment.lang('fr', {
                    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
                    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
                    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
                    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
                    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
                    longDateFormat : {
                        LT : "HH:mm",
                        L : "DD/MM/YYYY",
                        LL : "D MMMM YYYY",
                        LLL : "D MMMM YYYY LT",
                        LLLL : "dddd D MMMM YYYY LT"
                    },
                    calendar : {
                        sameDay: "[Aujourd'hui à] LT",
                        nextDay: '[Demain à] LT',
                        nextWeek: 'dddd [à] LT',
                        lastDay: '[Hier à] LT',
                        lastWeek: 'dddd [dernier à] LT',
                        sameElse: 'L'
                    },
                    relativeTime : {
                        future : "dans %s",
                        past : "il y a %s",
                        s : "quelques secondes",
                        m : "une minute",
                        mm : "%d minutes",
                        h : "une heure",
                        hh : "%d heures",
                        d : "un jour",
                        dd : "%d jours",
                        M : "un mois",
                        MM : "%d mois",
                        y : "une année",
                        yy : "%d années"
                    },
                    ordinal : function (number) {
                                return number + (number === 1 ? 'er' : 'ème');
                            },
                    week : {
                    dow : 1, // Monday is the first day of the week.
                        doy : 4  // The week that contains Jan 4th is the first week of the year.
                        }
                });
            $('[data-type="date"]').each(function()
            { 
                var localLang = moment($(this).html());
                localLang.lang('fr');
                $(this).html(localLang.fromNow());
            });
        }
    }
}

JsMoon.run = function()
{
    console.log('JsMoon is now running...');
    JsMoon.toggle.init();
    JsMoon.push.init();
    JsMoon.side.init();
    JsMoon.scroll.init();
    JsMoon.notifications.init();
    JsMoon.notifications.run();
    JsMoon.date.run();
}
})(jQuery);

JsMoon.run(); 
