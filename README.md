# roambookclub
Scripts for Roam Book Club and other Zettelkasten use. To get the full Hivemind experience, import the Hivemind Templates.md file (there is also a .json import option, and just the javascript is in hivemind.js). 

The repository also has three older scripts:
1. **checkForMissingZettels.js:** check for pages (zettels) that are missing from a zettel index. It gets the page titles that have blocks that have Page Type:: #Zettel in them. Can easily be extended to zettel questions as well.
2. **getMissingNotes.js:** similar to checkForMissingZettels.js, but works based on a prefix in the note's page title instead (for use with namespaced zettelkasten e.g. [[Seedling/My Note]]).
3. **addPageRefsToIndex.js:** populate the zettel index with (X page refs) after each zettel. (Caution: this smartblock overwrites the contents of blocks on the page. Backup your index page before you call it the first time, or test it on a different page, just in case.)

These are most easily used with SmartBlock buttons. However, some changes to SmartBlocks have been made that make it a little more difficult to use them with Javascript. Check out the migration guide [here](https://roamjs.com/extensions/smartblocks/developer_docs#lQzIf6sxv). I implemented this in the Hivemind code above for reference.

## Resources / References

* [Learn Datalog Today!](http://www.learndatalogtoday.org/)
* [Deep Dive Into Roam's Data Structure - Why Roam is Much More Than a Note Taking App](https://www.zsolt.blog/2021/01/Roam-Data-Structure-Query.html)
* [Datalog Queries for Roam Research | David Bieber](https://davidbieber.com/snippets/2020-12-22-datalog-queries-for-roam-research/)
* [More Datalog Queries for Roam | David Bieber](https://davidbieber.com/snippets/2021-01-04-more-datalog-queries-for-roam/)
* [Introduction to the Roam Alpha API - Put Your Left Foot](https://www.putyourleftfoot.in/introduction-to-the-roam-alpha-api)
