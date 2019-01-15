function timerDelChan() {

  leftTime = "\`1 minute et 20 secondes\`**";
  
  setTimeout(function() {
  	leftTime = "\`1 minute et 10 secondes\`**";
  }, 13 * 1000)

  setTimeout(function() {
  	leftTime = "\`1 minute\`**";
  }, 23 * 1000)

  setTimeout(function() {
  	leftTime = "\`50 secondes\`**";
  }, 33 * 1000)

  setTimeout(function() {
  	leftTime = "\`40 secondes\`**";
  }, 43 * 1000)

  setTimeout(function() {
  	leftTime = "\`30 secondes\`**";
  }, 53 * 1000)

  setTimeout(function() {
  	leftTime = "\`20 secondes\`**";
  }, 63 * 1000)

  setTimeout(function() {
  	leftTime = "\`10 secondes\`**";
  }, 73 * 1000)

}

module.exports = timerDelChan;