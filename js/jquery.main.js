(function($) {
    'use strict';

/********************************
 ********** plugins**************
 *******************************/

$(document).ready(function() {
    // main elements
    var $body = $('body');
    var $win = $(window);

    // remove page load screen on load
    $win.on('load', function() {
        $('#pageLoad')
            .remove();
    });

    // scroll to top
    $win.scroll(function() {
        if ($(this).scrollTop() > 1000) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });

    $('#scroll-to-top').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // initialize WOW animation
    new WOW()
        .init();

    // sticky header setup
    $win.scroll(function() {
        if ($(this).scrollTop() > 42) {
            $('#waituk-main-header').addClass("dropped-shadow");
        } else {
            $('#waituk-main-header').removeClass("dropped-shadow");
        }
    });

    // Counter Sectiion
    var $counter = $('.number');
    if ($counter.length) {
        $counter.counterUp({
            delay: 10,
            time: 2000
        });
    }

    // Image Resize on Window Resize
    $('.bg-stretch').each(function() {
        ImageStretcher.add({
            container: this,
            image: 'img'
        });
    });

    // Progressbar animation
    $(function() {
        $('.progress .progress-bar').css("width",
            function() {
                return $(this).attr("aria-valuenow") + "%";
            }
        )
    });

    /**
     * search screen plugin
     * @param {object} options
     */
    function Search(options) {
        this.options = $.extend({
            container: null,
            hideOnClickOutside: false,
            menuActiveClass: 'nav-active',
            menuOpener: '.nav-opener',
            menuDrop: '.nav-drop',
            toggleEvent: 'click.search',
            outsideClickEvent: 'click.search touchstart.search pointerdown.search MSPointerDown.search'
        }, options);
        this.initStructure();
        this.attachEvents();
    }

    Search.prototype = {
        initStructure: function() {
            this.page = $('html');
            this.container = $(this.options.container);
            this.opener = this.container.find(this.options.menuOpener);
            this.drop = this.container.find(this.options.menuDrop);
        },
        attachEvents: function() {
            var self = this;
            if (activateResizeHandler) {
                activateResizeHandler();
                activateResizeHandler = null;
            }
            this.outsideClickHandler = function(e) {
                if (self.isOpened()) {
                    var target = $(e.target);
                    if (!target.closest(self.opener)
                        .length && !target.closest(self.drop)
                        .length) {
                        self.hide();
                    }
                }
            };
            this.openerClickHandler = function(e) {
                e.preventDefault();
                self.toggle();
            };
            this.opener.on(this.options.toggleEvent, this.openerClickHandler);
        },
        isOpened: function() {
            return this.container.hasClass(this.options.menuActiveClass);
        },
        show: function() {
            this.container.addClass(this.options.menuActiveClass);
            if (this.options.hideOnClickOutside) {
                this.page.on(this.options.outsideClickEvent,
                    this.outsideClickHandler);
            }
        },
        hide: function() {
            this.container.removeClass(this.options.menuActiveClass);
            if (this.options.hideOnClickOutside) {
                this.page.off(this.options.outsideClickEvent,
                    this.outsideClickHandler);
            }
        },
        toggle: function() {
            if (this.isOpened()) {
                this.hide();
            } else {
                this.show();
            }
        },
        destroy: function() {
            this.container.removeClass(this.options.menuActiveClass);
            this.opener.off(this.options.toggleEvent, this.clickHandler);
            this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        }
    };

    var activateResizeHandler = function() {
        var win = $win,
            doc = $('html'),
            resizeClass = 'resize-active',
            flag, timer;
        var removeClassHandler = function() {
            flag = false;
            doc.removeClass(resizeClass);
        };
        var resizeHandler = function() {
            if (!flag) {
                flag = true;
                doc.addClass(resizeClass);
            }
            clearTimeout(timer);
            timer = setTimeout(removeClassHandler, 500);
        };
        win.on('resize orientationchange', resizeHandler);
    };

    $.fn.search = function(options) {
        return this.each(function() {
            var params = $.extend({}, options, {
                    container: this
                }),
                instance = new Search(params);
            $.data(this, 'Search', instance);
        });
    };

    // apply search plugin
    $body.search({
        hideOnClickOutside: true,
        menuActiveClass: 'search-active',
        menuOpener: '.nav-search-link',
        menuDrop: '.holder'
    });

    // side Panel
    $body.search({
        hideOnClickOutside: true,
        menuActiveClass: 'nav-active',
        menuOpener: '.nav-trigger a',
        menuDrop: '.nav-wrap'
    });

// Map Holder disable scroll on wheel
    $('.map-holder')
    .click(function(){
            $(this).find('iframe').addClass('clicked')})
    .mouseleave(function(){
            $(this).find('iframe').removeClass('clicked')});

// ripple effect for button
    var $ripple = $('.js-ripple');

    $ripple.on('click.ui.ripple', function(e) {

        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.c-ripple__circle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
            top: y + 'px',
            left: x + 'px'
        });

        $this.addClass('is-active');

    });

    $ripple.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
        $(this).removeClass('is-active');
    });

    });

}(jQuery));
