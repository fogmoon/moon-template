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
    JsMoon.notifications.init();
    JsMoon.notifications.run();
    JsMoon.date.run();
}
})(jQuery);

JsMoon.run(); 
