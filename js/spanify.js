/*---------------------------------------------------------------------------*
 * Spanifier wraps every word in the document body inside a
 * <span class="word">, which are also maintained in an internal list.
 * Should probably rewrite this as a jQuery method and use .each
 * (similar to lettering.js). 
 *
 * Daniel Jones <http://www.erase.net/> 2013
 *-----------------------------------------------------------------------*/

function Spanifier()
{
	this.spans = [];
	this.index = 0;
	this.lastNode = null;
}

Spanifier.prototype.spanify = function(t)
{
	if (t.tagName != 'SCRIPT' && t.tagName != 'NOSCRIPT' && t.tagName != 'STYLE' && t.className != "word")
	{
		if (t.tagName)
			console.log("spanify tag: " + t.tagName);
		if (t.childNodes.length)
		{
			if (!$(t).is(":visible"))
			{
				return;
			}
			var children = t.childNodes;
			for(var n = 0; n < children.length; n++)
				this.spanify(children[n])
		}
		if (t.nodeType == Node.TEXT_NODE && /\S/.test(t.nodeValue))
		{
			var text = $(t).text();
			var words = text.match(/\S+/g);
			var fragment = document.createDocumentFragment();
			/*------------------------------------------------------------------------
			 * beware of for..in, as it will throw up all sorts of weird methods if
			 * Object.prototype has been meddled with (eg Prototype.js)
			 *-----------------------------------------------------------------------*/
			for (var index = 0; index < words.length; index++)
			{
				var word = words[index];
				var span = document.createElement("span");
				span.className = "word";
				span.appendChild(document.createTextNode(word));
				fragment.appendChild(span);

				// TODO: use the actual spacing between words
				// (otherwise we badly break anything in <pre>)
				fragment.appendChild(document.createTextNode(" "));
				this.spans.push(span);
			}

			var parent = t.parentNode;
			parent.replaceChild(fragment, t);
		}
	}
	return this.spans;
}

Spanifier.prototype.next = function()
{
	var rv = this.spans[this.index];
	this.index = (this.index + 1) % this.spans.length;
	return rv;
}

Spanifier.prototype.highlight = function(node)
{
	if (this.lastNode !== null)
		this.lastNode.style.backgroundColor = "transparent";

	node.style.backgroundColor = "#ff4";
	this.lastNode = node;
}
