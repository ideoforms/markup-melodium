/*------------------------------------------------------------------------
 * Sine player
 * Uses WebAudio oscillator node
 *-----------------------------------------------------------------------*/

function SinOsc()
{
	this.context = 0;
	this.compressor = 0;
	this.reverb = 0;
}

SinOsc.prototype.init = function()
{
	this.context = new AudioContext();
	this.compressor = this.context.createDynamicsCompressor();
	// Skip reverb for now (causes too much load)
	// this.reverb = this.context.createConvolver();
	// this.reverbGain = this.context.createGain();
	// this.reverbGain.gain.value = 0.9;

	// this.compressor.connect(this.reverb);
	this.compressor.connect(this.context.destination);
	// this.reverb.connect(this.reverbGain);
	// this.reverbGain.connect(this.context.destination);
}

SinOsc.prototype.loadIR = function(url)
{
	var request = new XMLHttpRequest();
	var player = this;
	url = player.root + url;
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function()
	{
		player.context.decodeAudioData(request.response, function(buffer)
		{
			player.reverb.buffer = buffer;
			console.log("loaded IR");
		}, function (error)
		{
			console.log("IR load failed: " + error);
		});
	};
	request.send();
}

SinOsc.prototype.loadIRData = function(id)
{
    var data = samples[id];
    var arrayBuffer = Base64Binary.decodeArrayBuffer(data);
    var player = this;

	player.context.decodeAudioData(arrayBuffer, function(buffer)
	{
		player.reverb.buffer = buffer;
		console.log("loaded IR");
	}, function (error)
	{
		console.log("IR load failed: " + error);
	});
}

SinOsc.prototype.playFreq = function(freq, lpf, amp)
{
	lpf = typeof lpf !== 'undefined' ? lpf : 5000;
	amp = typeof amp !== 'undefined' ? amp : 0.5;
	// console.log("playFreq " + freq);

	var osc = this.context.createOscillator();
	osc.type = osc.SINE;
	osc.frequency.value = freq;

	var gainNode = this.context.createGain();
	gainNode.gain.value = 0.12 * amp;

	var lowpass = this.context.createBiquadFilter();
	// lowpass.frequency.value = 50 + Math.random() * 15000;
	// lowpass.Q.value = Math.random() * 15;
	lowpass.frequency.value = lpf * 10;
	// lowpass.Q.value = 15;
	lowpass.Q.value = Math.random() * 10;

	/*
	// Waveshaper. Not used for now.
	// (From BBC's Radiophonic Workshop HTML5 model)
	var vb = 0.0;
    var vl = 0.7;
    var h = 1.0;

    var samples = 1024;
    var wsCurve = new Float32Array(samples);

	for (var i = 0; i < wsCurve.length; i++)
	{
		var v = (i - samples / 2) / (samples / 2); // -1..1
		v = Math.abs(v);

		if (v <= vb)
			value = 0;
		else if ((vb < v) && (v <= vl))
			value = h * ((Math.pow(v - vb, 2)) / (2 * vl - 2 * vb));
		else
			value = h * v - h * vl + (h * ((Math.pow(vl - vb, 2)) / (2 * vl - 2 * vb)))

		wsCurve[i] = value;
	}

	var shaper = this.context.createWaveShaper();
	shaper.curve = wsCurve;
	*/

	osc.connect(lowpass);
	lowpass.connect(gainNode);
	gainNode.connect(this.compressor);

	osc.start(this.context.currentTime);
	osc.stop(this.context.currentTime + 0.1);
}

