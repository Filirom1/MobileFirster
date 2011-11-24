(function(Modernizr){
  var MobileFirster = Modernizr;
  var _tests = [];

  // Define an array of custom tests.
  // These tests could be updated with media queries. See next method.
  MobileFirster.setCustomTests = function(tests){
    _tests = tests;
    MobileFirster.updateTests();
    return MobileFirster;

  };

  // an array of media queries.
  MobileFirster.updateWithMediaQuery = function(mq){
    if(typeof mq === 'string') {
      mq = [mq];
    }
    for(var key in mq){
      /* Why can't I use matchMedia(mq.XXX).addListener(updateTestsThrottled) */
      mql(mq[key], MobileFirster.updateTests);
    }
    return MobileFirster;
  };

  // Update Modernizr tests
  MobileFirster.updateTests = function(){
    for(var i in _tests){
      var test = _tests[i];
      for(var key in test){
        MobileFirster.removeTest(key);
        Modernizr.addTest(key, test[key]);
      }
    }
    invokeListenersThrottled(Modernizr);
  };

  // add feature removeTest in Modernizr
  MobileFirster.removeTest = function removeTest(feature){
    delete Modernizr[feature];
    var re = new RegExp("\\b(no-)?" + feature + "\\b");
    var docElement = document.documentElement;
    docElement.className = docElement.className.replace( re, '' );
    invokeListenersThrottled(Modernizr);
    return MobileFirster;
  };

  // override a Modernizr test
  MobileFirster.force = function force(feature, bool){
    if (bool === undefined || bool === null) bool=true;
    MobileFirster.removeTest(feature);
    Modernizr.addTest(feature, function(){return bool;});
    MobileFirster.updateTests();
    return MobileFirster;
  };

  // A list of listeners that will be notified when tests change.
  MobileFirster.listeners = [];

  // Add a listener to be notified if tests changed.
  MobileFirster.addListener = function addListener(cb){
    if (typeof cb === 'function') MobileFirster.listeners.push(cb);
    return MobileFirster;
  };

  // Remove a listener to be notified if tests changed.
  MobileFirster.removeListener = function removeListener(cb){
    var idx = MobileFirster.listeners.indexOf(cb);
    if(idx!=-1) MobileFirster.listeners.splice(idx, 1);
    return MobileFirster;
  };

  // Notify every listeners.
  // This method is called when addTest or removeTest is called.
  function invokeListeners(){
    for (var i in MobileFirster.listeners){
      MobileFirster.listeners[i].call(this, arguments);
    }
  }

  // This method is throttled, so only one event is fired per every 100ms.
  function invokeListenersThrottled(){
    throttle(invokeListeners);
  }

  // Returns a throttled version of the function, that, when invoked repeatedly,
  // will only actually call the wrapped function at most once per every `time` ms.
  function throttle(method, time) {
    clearTimeout(method._tId);
    method._tId= setTimeout(function(){
        method.call();
    }, time || 100);
  }

  window.MobileFirster = MobileFirster;
})(Modernizr);
