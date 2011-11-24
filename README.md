MobileFirster : a dynamic Modernizr for build Mobile First - Single Page Web App
=================================================================================

Modernizr is good, really good ! Unfortunately Modernizr execute its
tests only once at load time. Then it's impossible to update it.

For exemple if I add a test on a Media Query :

    Modernizr.addTest('phone', function() { return Modernizr.mq('only screen and (max-width:960px)') })

I resize my browser, but the phone test will not change


With MobileFirster it is now possible to do it:

    var smartphoneMq = 'only screen and (max-width: 640px)';
    var tabletMq =     'only screen and (min-width: 641px) and (max-width: 1023px)';
    var desktopMq =    'only screen and (min-width: 1024px)';

    var tests = [
      { phone:         function(){ return !Modernizr.touch && Modernizr.mq(smartphoneMq); } },
      { smartphone:    function(){ return  Modernizr.touch && Modernizr.mq(smartphoneMq); } },
      { tablet:        function(){ return  Modernizr.touch && Modernizr.mq(tabletMq); } },
      { netbook:       function(){ return !Modernizr.touch && Modernizr.mq(tabletMq); } },
      { desktop:       function(){ return  Modernizr.mq(desktopMq); } },
    ];

    MobileFirster.setCustomTests(tests)
               .updateWithMediaQuery([smartphoneMq, tabletMq, desktopMq])
               .addListener(function(){
                 console.log('Modernizr is updated.');
               })

Resize your browser, and you will see `Modernizr is upadted` each time a
media query is changed.
