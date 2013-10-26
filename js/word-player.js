/*------------------------------------------------------------------------
 * WordPlayer generates melodic output based on the vowel content of a
 * given word, with convolution-based reverb.
 *-----------------------------------------------------------------------*/

function WordPlayer()
{
	this.sinosc = new SinOsc();
	this.sinosc.init();
	// this.sinosc.reverbGain.gain.value = 0.3;

	this.vowel_freqs = {
		"e" : 201,
		"a" : 301,
		"u" : 401,
		"i" : 601,
		"o" : 800,
		"y" : 8000,
	};

	this.lastSpan = null;
	this.lastWord = null;
}

WordPlayer.prototype.playWord = function(span)
{
		var player = this;

		var word = span.textContent;
		this.lastWord = word;

		var vowels = word.toLowerCase().replace(/[^aeiuoy]/g, "");
		// console.log("vowels " + vowels);
		vowel = vowels[0];

		/*------------------------------------------------------------------------
		 * Alter the frequency of the output based on the kind of tag this word
		 * is contained within (more bassy for headers, etc)
		 *-----------------------------------------------------------------------*/
		var multiplier = 1.0;
		if (span.parentNode.tagName == "H1")
			multiplier = 0.5;
		if (span.parentNode.tagName == "H2")
			multiplier = 0.75;
		if (span.parentNode.tagName == "B")
			multiplier = 1.25;
		if (span.parentNode.tagName == "I")
			multiplier = 1.5;
		if (span.parentNode.tagName == "A")
			multiplier = 2;

		var firstLetter = word[0].toLowerCase();
		var firstLetterIndex = firstLetter.charCodeAt(0) - 97;
		if (firstLetterIndex < 0) firstLetterIndex = 0;
		if (firstLetterIndex > 30) firstLetterIndex = 30;
		var filterFreq = 100 + firstLetterIndex * 500;
		// console.log("filterFreq " + filterFreq);
		for (var index = 0; index < vowels.length; index++)
		{
			vowel = vowels[index];
			this.sinosc.playFreq(this.vowel_freqs[vowel] * multiplier, filterFreq);
			// this.sinosc.playFreq(this.vowel_freqs[vowel] * multiplier * 1.5, filterFreq * 0.5, 0.1);
		}
}

WordPlayer.prototype.rest = function()
{
	var rest = 0;
	var word = this.lastWord;

	if (word[word.length - 1] == ".")
		rest = 2;
	else if (word[word.length - 1] == ",")
		rest = 1;
	else if (word[word.length - 1] == ";")
		rest = 1;
	else if (word[word.length - 1] == ":")
		rest = 1;

	return rest;
}

