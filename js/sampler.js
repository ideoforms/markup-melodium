function SamplePlayer()
{
	this.context = 0;
	this.compressor = 0;
	this.reverb = 0;
	this.buffers = {};
	this.root = "";
}

SamplePlayer.prototype.init = function()
{
	this.context = new AudioContext();
	this.compressor = this.context.createDynamicsCompressor();
	this.reverb = this.context.createConvolver();
	this.reverbGain = this.context.createGain();
	this.reverbGain.gain.value = 0.2

	this.compressor.connect(this.reverb);
	this.compressor.connect(this.context.destination);
	this.reverb.connect(this.reverbGain);
	this.reverbGain.connect(this.context.destination);
}

SamplePlayer.prototype.loadIR = function(url)
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
			// console.log("loaded IR");
		}, function (error)
		{
			console.log("IR load failed: " + error);
		});
	};
	request.send();
}

SamplePlayer.prototype.loadIRData = function(id)
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

SamplePlayer.prototype.loadSound = function(url, id)
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
			console.log("loaded sound");
			player.buffers[id] = buffer;
		},
		function (error)
		{
			console.log("load failed: " + error);
		});
	};
	request.send();
}

SamplePlayer.prototype.loadData = function(data, id)
{
	var arrayBuffer = Base64Binary.decodeArrayBuffer(data);
	var player = this;

	player.context.decodeAudioData(arrayBuffer, function(buffer)
	{
		console.log("loaded sound");
		player.buffers[id] = buffer;
	},
	function (error)
	{
		console.log("load failed: " + error);
	});
}

SamplePlayer.prototype.playSound = function(id)
{
	if (!this.buffers[id])
	{
		console.log("tag not found: " + id);
		return;
	}
		
	// console.log("playSound " + id);

	var oneshot = this.context.createBufferSource();
	oneshot.buffer = this.buffers[id];

	// Create a filter, panner, and gain node. 
	var lowpass = this.context.createBiquadFilter();
	lowpass.type = lowpass.NOTCH; // notch
	lowpass.frequency.value = 200 + Math.random() * 5000;
	// lowpass.Q.value = Math.random() * 10.0;
	var gainNode = this.context.createGain();

	oneshot.connect(lowpass);
	lowpass.connect(gainNode);
	gainNode.connect(this.compressor);

	// Play 0.75 seconds from now (to play immediately pass in 0)
	oneshot.start(this.context.currentTime);
}

