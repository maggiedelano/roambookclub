# roambookclub
Scripts for Roam Book Club. Right now this has two scripts:

1. one to check for pages (zettels) that are missing from a zettel index. It gets the page titles that have blocks that have Page Type:: Zettel in them. Can easily be extended to zettel questions as well.
2. one to populate the zettel index with (X page refs) after each zettel. (Caution: this smartblock overwrites the contents of blocks on the page. Backup your index page before you call it the first time, or test it on a different page, just in case.)

These are most easily used with 42SmartBlock buttons. To use, create a new smartblock (#42SmartBlock Your SmartBlock Name). Underneath the smart block name, type <%J: %>. Then, go back after the colon and type ``` to insert a javascript code block. Paste the code inside the code block. You can also make a button using {{BUTTON TITLE:42SmartBlock:Your SmartBlock Name:42RemoveButton=false}}.

## Resources / References

* [Learn Datalog Today!](http://www.learndatalogtoday.org/)
* [Deep Dive Into Roam's Data Structure - Why Roam is Much More Than a Note Taking App](https://www.zsolt.blog/2021/01/Roam-Data-Structure-Query.html)
* [Datalog Queries for Roam Research | David Bieber](https://davidbieber.com/snippets/2020-12-22-datalog-queries-for-roam-research/)
* [More Datalog Queries for Roam | David Bieber](https://davidbieber.com/snippets/2021-01-04-more-datalog-queries-for-roam/)
* [Introduction to the Roam Alpha API - Put Your Left Foot](https://www.putyourleftfoot.in/introduction-to-the-roam-alpha-api)
