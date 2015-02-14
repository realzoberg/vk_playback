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
        };

        function addPlaybackRateControl(id, pad) {
            var playbackRate = ce('select', {id: id}, {
                marginBottom:'8px',cursor:'pointer',background:'#fff',border:'1px solid #E3E9EF',borderRadius:'2px'
              });

            addRateOptionDisabled(playbackRate, "Rate");
            addRateOption(playbackRate, "0.5");
            addRateOption(playbackRate, "0.75");
            addRateOption(playbackRate, "1.0");
            addRateOption(playbackRate, "1.25");
            addRateOption(playbackRate, "1.5");
            addRateOption(playbackRate, "2.0");

            addPlaybackRateListeners(playbackRate);

            ge(pad + 'side_filters').insertBefore(playbackRate, ge(pad + 'album_filters'));

            return playbackRate;
        }
          
        function addRateOption(playbackRate, rate) {
          var rateOpt = document.createElement("option");
          rateOpt.text = rate;
          rateOpt.value = parseFloat(rate);
          playbackRate.add(rateOpt);
        }
          
        function addRateOptionDisabled(playbackRate, text) {
          var rateOpt = document.createElement("option");
          rateOpt.setAttribute("disabled", "disabled");
          rateOpt.setAttribute("selected", "selected");
          rateOpt.text = text;
          playbackRate.add(rateOpt);
        }
          
        function addOptGroup(playbackRate, label) {
          var rateOptGroup = document.createElement("optgroup");
          rateOptGroup.label = label;
          playbackRate.add(rateOptGroup);
        }

        var currentPlaybackRate = 1.0;
        function addPlaybackRateListeners(playbackRate) {
          playbackRate.addEventListener("change", function(event, opts) {
              var audio = document.getElementsByTagName("audio");
              if(audio.length > 0) {
                  audio[0].playbackRate = playbackRate.value;
              }
              currentPlaybackRate = playbackRate.value;
          });
        }
          
        function playHandler(event) {
            var audio = document.getElementsByTagName("audio");
            if(audio.length > 0) {
                audio[0].playbackRate = currentPlaybackRate;
            }

            var select = document.getElementById("playbackRate");
            if(!select && ge('side_filters')) {
              addPlaybackRateControl("playbackRate", "");
            }

            var padSelect = document.getElementById("padPlaybackRate");
            if(!padSelect && ge('pad_side_filters')) {
              addPlaybackRateControl("padPlaybackRate", "pad_");
            }
        }
          
        setInterval(playHandler, 10);
          
        var ac_play = document.getElementById("ac_play");
        ac_play.addEventListener("click", playHandler);
      });
  })(window);
});