(function($) {

    skel.breakpoints({
        large: '(max-width: 1680px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $html = $('html');

        // Disable animations/transitions until the page has loaded.
            $html.addClass('is-loading');

            $window.on('load', function() {
                window.setTimeout(function() {
                    $html.removeClass('is-loading');
                }, 0);
            });

        // Touch mode.
            if (skel.vars.mobile) {

                var $wrapper;

                // Create wrapper.
                    $body.wrapInner('<div id="wrapper" />');
                    $wrapper = $('#wrapper');

                    // Hack: iOS vh bug.
                        if (skel.vars.os == 'ios')
                            $wrapper
                                .css('margin-top', -25)
                                .css('padding-bottom', 25);

                    // Pass scroll event to window.
                        $wrapper.on('scroll', function() {
                            $window.trigger('scroll');
                        });

                // Scrolly.
                    $window.on('load.hl_scrolly', function() {

                        $('.scrolly').scrolly({
                            speed: 1500,
                            parent: $wrapper,
                            pollOnce: true
                        });

                        $window.off('load.hl_scrolly');

                    });

                // Enable touch mode.
                    $html.addClass('is-touch');

            }
            else {

                // Scrolly.
                    $('.scrolly').scrolly({
                        speed: 1500
                    });

            }

        // AJAX Form Submission
            var submitTimer = null,
                submitButton = $("#submit-button"),
                submitted = false;

            $("form").on('submit', function(e) {
                e.preventDefault();
                if (submitted === false){
                  submitButton.removeClass("filled");
                  submitButton.addClass("circle");
                  submitButton.html("");

                  $.ajax({
                      url: $(this).attr('action'),
                      type: $(this).attr('method'),
                      data: $(this).serialize(),
                      success: function() {
                          console.log("Successful Submission");
                      }
                  });

                  submitted = true;
                  $("#submit-svg").css("display", "block");
                  $(".circle_2").attr("class", "circle_2 fill_circle");

                  submitTimer = setInterval(function () {
                    submitButton.removeClass("circle");
                    submitButton.addClass("filled");
                    $(".submit-wrap i").css("display", "block");
                    $("#submit-svg").css("display", "none");
                    clearInterval(submitTimer);
                  }, 2500);
                }
            });

        // Fix: Placeholder polyfill.
            $('form').placeholder();

        // Prioritize "important" elements on medium.
            skel.on('+medium -medium', function() {
                $.prioritize(
                    '.important\\28 medium\\29',
                    skel.breakpoint('medium').active
                );
            });

        // Star Background
            setInterval(function () {
                $('.star-1').fadeOut(150).delay(2000).fadeIn(300).fadeOut(150).delay(1254);
                $('.star-2').fadeOut(300).fadeIn(120).fadeOut(120).delay(1920);
                $('.star-3').fadeOut(150).delay(1200).fadeIn(300).fadeOut(150).delay(800);
                $('.star-4').fadeOut(700).fadeIn(300).fadeOut(160).delay(1350);
                $('.star-5').fadeOut(700).fadeIn(300).fadeOut(160).delay(1350);
            }, 1);

        // Bar Charts
            $(".legend-symbol").hover(function() {
                var $this = $(this),
                    id = $this.attr("id");

                $(".chart--" + id).toggleClass("hvr-grow-active");
            });

        // FireFox image-one Substitute
            var isFirefox = typeof InstallTrigger !== 'undefined';

            function replaceImageOne() {
                if (isFirefox) {
                    if (window.innerWidth <= 980) {
                        $(".image-one-small").attr("src", "https://s3.amazonaws.com/richardleo-website/rich_and_maddie.jpeg");
                    } else {
                        $(".image-one-small").attr("src", "https://s3.amazonaws.com/richardleo-website/market.jpg");
                    }
                }
            };

            replaceImageOne();

            $(window).resize(function() {
                replaceImageOne();
            });

        // Header.
            var $header = $('#header'),
                $headerTitle = $header.find('header'),
                $headerContainer = $header.find('.container');

            // Make title fixed.
                if (!skel.vars.mobile) {

                    $window.on('load.hl_headerTitle', function() {

                        skel.on('-medium !medium', function() {

                            $headerTitle
                                .css('position', 'fixed')
                                .css('height', 'auto')
                                .css('top', '53%')
                                .css('left', '0')
                                .css('width', '100%')
                                .css('margin-top', ($headerTitle.outerHeight() / -2));

                        });

                        skel.on('+medium', function() {

                            $headerTitle
                                .css('position', '')
                                .css('height', '')
                                .css('top', '')
                                .css('left', '')
                                .css('width', '')
                                .css('margin-top', '');

                        });

                        $window.off('load.hl_headerTitle');

                    });

                }

            // Scrollex.
                skel.on('-small !small', function() {
                    $header.scrollex({
                        terminate: function() {

                            $headerTitle.css('opacity', '');

                        },
                        scroll: function(progress) {

                            // Fade out title as user scrolls down.
                                if (progress > 0.5)
                                    x = 1 - progress;
                                else
                                    x = progress;

                                $headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));

                        }
                    });
                });

                skel.on('+small', function() {

                    $header.unscrollex();

                });

        // Main sections.
            $('.main').each(function() {

                var $this = $(this),
                    $primaryImg = $this.find('.image.primary > img'),
                    $bg,
                    options;

                // No primary image? Bail.
                    if ($primaryImg.length == 0)
                        return;

                // Hack: IE8 fallback.
                    if (skel.vars.IEVersion < 9) {

                        $this
                            .css('background-image', 'url("' + $primaryImg.attr('src') + '")')
                            .css('-ms-behavior', 'url("css/ie/backgroundsize.min.htc")');

                        return;

                    }

                // Create bg and append it to body.
                    $bg = $('<div class="main-bg" id="' + $this.attr('id') + '-bg"></div>')
                        .css('background-image', (
                            'url("https://s3.amazonaws.com/richardleo-website/overlay.png"), url("' + $primaryImg.attr('src') + '")'
                        ))
                        .appendTo($body);

                // Scrollex.
                    options = {
                        mode: 'middle',
                        delay: 200,
                        top: '-10vh',
                        bottom: '-10vh'
                    };

                    if (skel.canUse('transition')) {

                        options.init = function() { $bg.removeClass('active'); };
                        options.enter = function() { $bg.addClass('active'); };
                        options.leave = function() { $bg.removeClass('active'); };

                    }
                    else {

                        $bg
                            .css('opacity', 1)
                            .hide();

                        options.init = function() { $bg.fadeOut(0); };
                        options.enter = function() { $bg.fadeIn(400); };
                        options.leave = function() { $bg.fadeOut(400); };

                    }

                    $this.scrollex(options);

            });

    });

})(jQuery);