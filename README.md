# Droid Finder (aka 'Mastermind')

**Find 'em [HERE](annalexc.github.io/DroidFinder)!**

## Are these the droids you're looking for?
As an Imperial Stormtrooper, your task (of paramount importance) is to find a set of unique droids somewhere in the galaxy. These droids must also be presented to your Sith authority in a specific order. You'll have only a few chances to guess the correct droid "code", and to determine their unique order. Thankfully, you'll also be given hints that aren't subject to Jedi obfuscation.

_**Welcome Screen**_

![Welcome Imperial Mastermind!](https://github.com/annalexc/DroidFinder/blob/gh-pages/screenshots/homepage.png)


_**Wireframes**_

![Wireframe for welcome and play area](https://github.com/annalexc/DroidFinder/blob/gh-pages/screenshots/wireframes.png)

### Gameplay Componentry ###

_**Play Area** - Selectable droids along the top, "guess area" immediately below_

![Let's play!](https://github.com/annalexc/DroidFinder/blob/gh-pages/screenshots/gameplay.png)

  * **Selectable Droids:** _A subset of droids to choose from when formulating a guess at the final "code". Depending on the difficulty setting of the game, you'll have 5 - 8 droids to include in your guesses._
  
  * **N-Droid "Code":** _Depending on the difficulty setting of the game, you'll have either a 4- or 5-droid "code" to break._
  
  * **Result Markers:** _After the submission of each guess - A BLACK peg will be displayed to represent each correct droid in the correct position, a WHITE peg will be displayed to represent each correct droid in the wrong position, and a CIRCLED X will be displayed to represent each incorrect droid._ 
  * **NOTE about Result Markers: The result markers do NOT correspond to the position of the droid in the guess submission, each peg only represents "the existence of" or "the absence of" a particular droid in a given guess**


### _**Hmmm, ok. Summary please?**_ ###

Level | Code Length | Selectable Droids | Rounds (Guesses)
:---: | :---: | :---: | :---:
Easy |  4  |  5  |  8
Medium |  4  |  6  |  10
Hard |  5  |  8  |  12

### Functional Summary ###

**Droids! Droids! Droids!**
* `droidsAll`: A collection of droid objects; Each droid is identified by a `droidKey` and has an associated `name` and `image` attribute.
* `selectableDroids`: For each new game, a set of selectable droids is randomly picked from `droidsAll`. Subsequently, a random final "code" is generated from the set of selectable droids.

**Game Interface**
* `droid-home`: A fixed "menu" where the selectable droids would like to live happily ever after
* `play-area`: A column that stores each of the player's guesses and corresponding submission results
* For each round, a droid can be **dragged and dropped** into the play area to forumlate a guess at the final code.

**Other Things**
* Droids wiggle when they're scared.
* Special thanks to @ajhofferber for helping me turn .off() that gremlin, Rosie.
