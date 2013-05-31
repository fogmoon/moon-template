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
        },imgbox : 
        {
            selector : 'data-img="box"'
        },
        load : 
        {
            target : 'data-load-target',
            template : 'data-load-template',
            position: 'data-load-position',
            effect: 'data-load-effect'
        },
        push : 
        {
            selector : 'data-role="push"',
            direction : 'data-push-direction',
            menu : 'data-push-menu'
        },
        markdown : 
        {
            selector : 'data-type="markdown"',
            source : 'data-source'
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
                if($(this).is('option'))
                {
                    $(this).parent().change(function()
                    {
                        $(this).children('option:selected['+selector+']').each(function(){
                                   $('#'+ $(this).attr(selector)).slideToggle();
                        });
                    });
                }
                else
                {
                    $(this).click(function(){$('#'+ $(this).attr(selector)).slideToggle();})
                }
                $('#'+ $(this).attr(selector)).hide();
            });
        }
    }

    JsMoon.markdown = {
        init: function()
        {
            var convert = function(source,element,converter)
            {
                var toConvert = source.html() || source.val();
                var converted = converter.makeHtml(toConvert);
                element.html(converted);
                element.each(function(i, e) {hljs.highlightBlock(e)});
            }

            if(Markdown)
            {
                var selector = JsMoon.params.markdown.selector;
                var elements = $('[' + selector + ']');
                var sourceSelector = JsMoon.params.markdown.source;
                var converter = Markdown.getSanitizingConverter();
                converter.hooks.chain('preBlockGamut',function(text,rbg)
                {
                    return text.replace(/^ {0,3}``` *\n((?:.*?\n)+?) {0,3}``` *$/gm, function (whole, inner) 
                    {
                        return "<prout><code>" + rbg(inner) + "</code></prout>\n";
                    });
                });

                elements.each(function()
                {
                    var source = $(this).attr(sourceSelector);
                    if(source)
                    {
                        source = $(source).first();
                        var element = $(this);
                        convert(source,element,converter);
                        source.change(function()
                        {
                            convert($(this),element,converter);
                        });
                    }
                });
            }
        }
    }


    JsMoon.imgbox = {
        init: function()
        {
            if($.colorbox)
            {
                var selector = JsMoon.params.imgbox.selector;
                var elements = $('[' + selector + ']');
                elements.each(function()
                {
                    if( !$(this).parent().is('a') )
                    {
                        var link = $('<a></a>').attr('href',$(this).attr('src'));
                        $(this).wrap(link);
                    }
                });
                elements.parent().colorbox({ 
                    maxWidth:'90%', 
                    maxHeight:'90%', 
                    transition:'none', 
                    speed:0
                });
            }
        }
    }

    JsMoon.effect = {
        run: function(target,name)
        {
            if(target.jquery == undefined)
                var target = $(target);
            if(name == 'none' || name == undefined)
                return false;
            else {
                if(target.hasClass(name + '--hidden'))
                {
                    target.removeClass(name + '--hidden').removeClass('--hidden')
                    .addClass(name + '--showed');
                }
                else if(target.hasClass(name + '--showed'))
                {
                    target.removeClass(name + '--showed')
                    .addClass(name + '--hidden');
                }
                else
                {
                    target.addClass(name + '--hidden');
                }
            }
        },
        show: function(target,name)
        {
            if(target.jquery == undefined)
                var target = $(target);
            if(name == 'none' || name == undefined)
                return false;
            else 
            {
                target.addClass(name + '--showed').removeClass(name + '--hidden').removeClass('--hidden');
            }
        },
        hide: function(target,name)
        {
            if(target.jquery == undefined)
                var target = $(target);
            if(name == 'none' || name == undefined)
                return false;
            else 
            {
                target.addClass(name + '--hidden').removeClass(name + '--showed');
            }
        },
        startHidden : function(target)
        {
            if(target.jquery == undefined)
                var target = $(target);
            target.addClass('--hidden'); 
        }



    }

    JsMoon.load = {
        init: function()
        {
            var target = JsMoon.params.load.target;
            var targetTrigger = $('[' + target + ']');
            var position = JsMoon.params.load.position;
            var template = JsMoon.params.load.template;
            var effect = JsMoon.params.load.effect;


            targetTrigger.each(function()
            {
                $(this).click(function()
                {
                    var targetElement = $( $(this).attr(target) );
                    var contentUrl = $(this).attr(template);
                    var targetPosition = $(this).attr(position) || 'inner';
                    var effectType = $(this).attr(effect) || 'none';

                    switch(targetPosition) {
                        case 'afterLast':
                            $.get(contentUrl,function(data){targetElement.last().after(data);});
                            JsMoon.reload();
                        break;

                        case 'beforeFirst':
                            $.get(contentUrl,function(data){targetElement.first().before(data);});
                            JsMoon.reload();
                        break;
                        
                        case 'replace':
                            JsMoon.effect.hide(targetElement,'horiz-anim-left');
                            $.get(contentUrl,function(data)
                            {
                                var prevElem = targetElement.first().prev();
                                if(prevElem && data)
                                {
                                    targetElement.remove();
                                    var jdata = $(data).hide();
                                    prevElem.after(jdata);
                                    jdata.fadeIn();
                                }
                                JsMoon.reload();
                            });
                        break;

                        case 'inner':
                            $.get(contentUrl,function(data){
                                targetElement.html(data);
                                JsMoon.reload();
                            });
                        break;
                    }
                });
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
            elements.each(function()
            {
                var button = $(this);
                menuElement = $('#'+button.attr(menu));
                menuElement.first().addClass('cbp-spmenu').addClass('cbp-spmenu-vertical').addClass('cbp-spmenu-left');
                menuElement.append('<a data-role="close-side"><i class="icon-arrow-left"></i> Back</a>');
                button.click(function(){
                    menuElement = $('#'+$(this).attr(menu));
                    $(this).toggleClass('active');
                    $('body').toggleClass('cbp-spmenu-side-to'+$(this).attr(direction));
                    $('.cbp-spmenu-open').each(function()
                    {
                        if($(this).attr('id') != menuElement.attr('id'))
                            $(this).removeClass('cbp-spmenu-open');
                    });
                    menuElement.toggleClass('cbp-spmenu-open');
                });
                menuElement.find('a[data-role="close-side"]').click(function(){
                    menuElement.removeClass('cbp-spmenu-open');
                });
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
                        y : "un an",
                        yy : "%d ans"
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

            $('[data-type="age"]').each(function()
            { 
                var localLang = moment($(this).html());
                $(this).html(moment().year() - localLang.year());
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
    JsMoon.load.init();
    JsMoon.imgbox.init();
    JsMoon.notifications.init();
    JsMoon.notifications.run();
    JsMoon.date.run();
    JsMoon.markdown.init();
}

JsMoon.reload = function()
{
    JsMoon.imgbox.init();
    JsMoon.date.run();
    JsMoon.markdown.init();
}

})(jQuery);

JsMoon.run(); 
