## Are these the droids you're looking for?

Find 'em!

### Droid Finder (aka 'Mastermind')
* As an Imperial Stormtrooper, your task (of paramount importance) is to find a set of unique droids somewhere in the galaxy. These droids must also be presented to your Sith authority in a specific order. You'll have a few chances to guess the right droids, and to determine their unique order. Thankfully, you'll also have a few hints that aren't subject to Jedi obfuscation.

### Gameplay Componentry ###
  * Selectable Droids: _Depending on the difficulty setting of the game, you'll have 4 - 8 droids to include in your guesses._
  
  * N-Droid "Code": _Depending on the difficulty setting of the game, you'll have either a 4- or 5-droid "code" to break._
  
  * Result Markers: _After submission of each guess: A BLACK peg will be displayed to represent each correct droid in the correct position, a WHITE peg will be displayed to represent each correct droid in the wrong position, and a CIRCLED X will be displayed to represent each incorrect droid._


_**Yikes. Summary please?**_

Level | Code Length | Selectable Droids | Rounds
--- | --- | --- | ---
Easy |  4  |  4  |  8
Medium |  4  |  6  |  10
Hard |  5  |  8  |  12

### Functional Summary ###

**Droids! Droids! Droids!**
	* `droidsAll`: A collection of droid objects; Each droid is identified by a `droidKey` and has an associated `name` and `image` attribute.
	* For each new game, a set of selectable droids is randomly picked from `droidsAll`. Subsequently, a random final "code" is generated from the set of selectable droids.

**Game Interface**
	* `droid-home`: A fixed "menu" where the selectable droids would like to live happily ever after
	* `play-area`: A column that stores each of the player's guesses and corresponding submission results

**Other Things**
	* Droids wiggle when they're scared.
	* Special thanks to Ash for finding that gremlin, Rosie.

