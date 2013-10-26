The Markup Melodium
===================

*[Daniel Jones](http://erase.net/), October 2013*

Humans and machines read the web in starkly different ways. To us, a
webpage appears like a more whizz-bang version of a page of a magazine:
fragments of writing and pictures that we read in a linear fashion, from
left to right (in the English language, at least).

A machine such as a web browser reads the web in quite a different
manner. It uses the page's HTML markup tags (`<p>, <h1>`, etc) to
construct a *tree* structure, in which an element of the page might
contain several "branches" within it. This paragraph (\<p\>), for
example, contains a \<code\> branch and an italic \<i\> branch.

Conversely, each paragraph is contained within the document's \<body\>,
which itself is inside the top-level \<html\> tag. 

Structure and Sound
-------------------

The Markup Melodium is a digital sound project which translates a web
document's markup structure into a piece of music. It traverses a page's
tree structure, creating a sequence of every HTML node contained within
it, and transforms each node into a tiny fragment of sound. Each type of
node is represented as a distinct perscussive sample, creating an
emergent rhythm which reflects the document's own internal structure and
rhythm.

It simultaneously examines the text contained within the page, just as
we do as human readers. Each word is translated into a short melodic
note, whose pitch properties are determined by the vowel content of the
word.

Playing these percussive and melodic threads simultaneously gives a
musical rendering of the page which reflects these two distinct ways of
reading a page, the machinic and the human, with each in counterpoint to
the other.

Examples
--------

Sample pages as heard through the Markup Melodium.\
 Note that these require Web Audio support, which is featured in
**Safari 6+, Chrome 10+ and Firefox 25+** (requires Firefox Nightly
build at present). ([more information on Web Audio
support](http://caniuse.com/audio-api))

-   [Lewis Carroll's
    Jabberwocky](https://ideoforms.makes.org/thimble/jabberwocky-heard-through-markup-melodium)
-   [Markup Melodium Composition
    \#1](https://ideoforms.makes.org/thimble/markup-melodium-composition-1)
-   [This page as heard through the Markup
    Melodium](https://ideoforms.makes.org/thimble/about-the-markup-melodium-heard-through-the-markup-melodium)

You can create your own by remixing one of the above Thimbles. All of
the magic happens inside [this JavaScript
code](https://dl.dropboxusercontent.com/u/6137498/Webmaker/melodium.2013-10-07.js)
(coming soon to Github).

The name
--------

This project was named in tribute to [The
Melodium](http://cec.sonus.ca/econtact/13_4/rhea_bode_melodium.html), a
1938 musical instrument created by German physicist Harald Bode. Its
pioneering modular design anticipated today's synthesizers by many
decades. [More about Bode's instrument
designs](http://cec.sonus.ca/econtact/13_4/abocab_bode_instruments.html)
(with samples).

The technology
--------------

The Markup Melodium was achieved using standards-compliant HTML5 web
audio and Chris Wilson's [AudioContext Monkey
Patch](https://github.com/cwilso/webkitAudioContext-MonkeyPatch) for
cross-browser compatibility. It was commissioned by Mozilla as part of a Mozilla Webmaker Fellowship.

