The Markup Melodium
===================

*[Daniel Jones](http://erase.net/), October 2013*

Humans and machines read the web in starkly different ways. To us, a
webpage appears like a more whizz-bang version of a page of a magazine:
fragments of writing and pictures that we read in a linear fashion, from
left to right^1^.

A machine such as a web browser reads the web in quite a different
manner. It uses the page's HTML markup tags (`<p>, <h1>`, etc) to
construct a *tree* structure, in which an element of the page might
contain several "branches" within it. This paragraph (\<p\>), for
example, contains a \<code\> branch and an italic \<i\> branch.

Conversely, each paragraph is contained within the document's \<body\>,
which itself is inside the top-level \<html\> tag. [See a rendering of
this page's HTML tree
structure](http://software.hixie.ch/utilities/js/live-dom-viewer/?%3C!doctype%20html%3E%0A%3Chtml%3E%0A%20%20%3Chead%3E%0A%20%20%20%20%3Ctitle%3EThe%20Markup%20Melodium%3C%2Ftitle%3E%0A%20%20%3C%2Fhead%3E%0A%20%20%3Cbody%3E%0A%20%20%20%20%3Ch1%3EThe%20Markup%20Melodium%3C%2Fh1%3E%0A%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20Humans%20and%20machines%20read%20the%20web%20in%20starkly%20different%20ways.%20To%20us%2C%20a%20webpage%20appears%20like%20a%20more%20whizz-bang%20version%20of%20a%20page%20of%20a%20magazine%3A%20fragments%20of%20writing%20and%20pictures%20that%20we%20read%20in%20a%20linear%20fashion%2C%20from%20left%20to%20right%3Csup%3E1%3C%2Fsup%3E.%0A%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20A%20machine%20such%20as%20a%20web%20browser%20reads%20the%20web%20in%20quite%20a%20different%20manner.%20It%20uses%20the%20page's%20HTML%20markup%20tags%20(%3Ccode%3E%26lt%3Bp%26gt%3B%2C%20%26lt%3Bh1%26gt%3B%3C%2Fcode%3E%2C%20etc)%20to%20construct%20a%20%3Ci%3Etree%3C%2Fi%3E%20structure%2C%20in%20which%20an%20element%20of%20the%20page%20might%20contain%20several%20%22branches%22%20within%20it.%20This%20paragraph%20(%26lt%3Bp%26gt%3B)%2C%20for%20example%2C%20contains%20a%20%26lt%3Bcode%26gt%3B%20branch%20and%20an%20italic%20%26lt%3Bi%26gt%3B%20branch.%20%0A%20%20%20%20%0A%20%20%20%20%3Chr%3E%0A%20%20%20%20%3Cdiv%20class%3D%22footnotes%22%3E%0A%20%20%20%20%20%20%3Csup%3E1%3C%2Fsup%3E.%20In%20the%20English%20language%2C%20at%20least.%20%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A).

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
cross-browser compatibility.

More info coming soon.

* * * * *

^1^. In the English language, at least.
