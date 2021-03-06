 # Growbag
 
 (This lib is currently embedded in Gargame, but eventually this will become its own separate published module.)
 
 `Growbag` is a general utils library, originally built for use with my [Gargame](https://github.com/gargrave/gargame) game engine. It consists of lots of individual helper functions for doing all those little things we have to do over and over and over. Some of them are direct re-implementations of functions from Lodash, but others are just random helper functions that I find handy to have around.
 
 A few notes you should be aware of:
 
 - This is _not_ intended to be a replacement, competitor, or "better version" of Lodash. In 99.9% of use cases, you are probably better off using Lodash. This library is built specifically for the way I like to use it.
 - I have directly re-implemented some of Lodash's functions (e.g. `get`), but again, I am not including as much flexibility as you will find in the Lodash versions--this is entirely meant to be a minimal barebones version of exactly what I find myself needing in developing Gargame, primarily for the benefit of minimizing the number of NPM modules I would need to depend on.
 