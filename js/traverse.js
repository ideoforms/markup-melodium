/*------------------------------------------------------------------------
 * Traverser does a depth-first traversal of every node in the DOM tree
 * and turns it into a linear list, to which it maintains an internal
 * pointer. Call traverser.next() to return the next node in sequence.
 * We only spider document.body because we're not interested in
 * the <head>.
 *-----------------------------------------------------------------------*/

function Traverser()
{
	this.nodeList = [];
	this.delay = 500;
	this.index = 0;

	div = document.createElement("div");
    div.id = "highlight";
    document.body.appendChild(div);

	this.highlightNode = $("#highlight");
	this.highlightNode.css("position", "absolute");
	this.highlightNode.css("background", "rgba(0, 0, 0, 0.5)");
	this.highlightNode.css("color", "white");
	this.highlightNode.css("font", "11px helvetica");
	this.highlightNode.css("font-weight", "bold");
};

Traverser.prototype.traverse = function(element)
{
	traverser = this;
	
	if (element.nodeType == 1 || element.nodeType == 9)
	{
		/*------------------------------------------------------------------------
		 * avoid iframes or we'll run into XSS security problems
		 *-----------------------------------------------------------------------*/
		if (element.tagName.toLowerCase() == "iframe")
			return;

		el = $(element);
		el.contents().each(function()
		{
			child = this;
			if (child.nodeType == 1 || child.nodeType == 9)
			{
				traverser.nodeList.push(this);
				traverser.traverse(child);
			}
		});
	}
	return this.nodeList;
};

Traverser.prototype.next = function()
{
	var rv = this.nodeList[this.index];
	this.index = (this.index + 1) % this.nodeList.length;
	return rv;
};

Traverser.prototype.play = function(callback)
{
	this.iterateNodes(this.nodeList, callback)
};

Traverser.prototype.highlight = function(node)
{
	var rect = node.getBoundingClientRect();
	this.highlightNode.offset({ "left" : rect.left + window.pageXOffset, "top" : rect.top + window.pageYOffset });
	this.highlightNode.width(rect.right - rect.left);
	this.highlightNode.height(rect.bottom - rect.top);
	this.highlightNode.css("background", $(node).css("color"));
	this.highlightNode.text(node.tagName);
};

