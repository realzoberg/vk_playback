// <div>Icon made by <a href="http://www.simpleicon.com" title="SimpleIcon">SimpleIcon</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>

var execute = function (body) {
    if(typeof body === "function") { body = "(" + body + ")();"; }
    var el = document.createElement("script");
    el.textContent = body;
    document.body.appendChild(el);
    return el;
};

execute(function() {
  (function (window, undefined) { 
      stManager.add(['audioplayer.js','audio_html5.js'], function() { 
        var ap,fl,ac,ms,an,cv,ct,fd,i,tp=0;
        ap=audioPlayer;
        ap._ip=ap.initPlayer;
        ap.initPlayer=function() { 
          fl=browser.flash; 
          browser.flash=0; 
          ap._ip.apply(this,arguments);
          browser.flash=fl;
          ac=new (window.AudioContext||window.webkitAudioContext)();
          ms=ac.createMediaElementSource(ge('html5_audio'));
          ms.connect(ac.destination);
          an=ac.createAnalyser();
          an.fftSize=64;
          an.smoothingTimeConstant=0.3;
          ms.connect(an);
        };
          
        playbackRate=ce('select', {}, {
                      marginBottom:'8px',cursor:'pointer',background:'#fff',border:'1px solid #E3E9EF',borderRadius:'2px'
                    });
          
        function addRateOption(rate) {
          var rateOpt = document.createElement("option");
          rateOpt.text = rate;
          rateOpt.value = parseFloat(rate);
          playbackRate.add(rateOpt);
        }
          
        function addRateOptionDisabled(text) {
          var rateOpt = document.createElement("option");
          rateOpt.setAttribute("disabled", "disabled");
          rateOpt.setAttribute("selected", "selected");
          rateOpt.text = text;
          playbackRate.add(rateOpt);
        }
          
        function addOptGroup(label) {
          var rateOptGroup = document.createElement("optgroup");
          rateOptGroup.label = label;
          playbackRate.add(rateOptGroup);
        }      
          
        // addOptGroup("Rate");
        addRateOptionDisabled("Rate");
        addRateOption("1.0");
        addRateOption("1.25");
        addRateOption("1.5");
        addRateOption("2.0");
          
        var currentPlaybackRate = 1.0;
        playbackRate.addEventListener("change", function(event, opts) {
            var audio = document.getElementsByTagName("audio");
            if(audio.length > 0) {
                audio[0].playbackRate = playbackRate.value;
            }
            currentPlaybackRate = playbackRate.value;
        });
          
        function playHandler(event) {
            var audio = document.getElementsByTagName("audio");
            if(audio.length > 0) {
                audio[0].playbackRate = currentPlaybackRate;
            }          
        }
          
        setInterval(playHandler, 10);
          
        var ac_play = document.getElementById("ac_play");
        ac_play.addEventListener("click", playHandler);
        
        ge('side_filters').insertBefore(playbackRate, ge('album_filters'));
      });
  })(window);
});