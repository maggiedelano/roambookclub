newBlocks = displayPageRefs("Test Page"); // configure page title here
return "";


function getBlocksOnPage(pageTitle){
	let ancestorrule=`[ 
   [ (ancestor ?b ?a) 
        [?a :block/children ?b] ] 
   [ (ancestor ?b ?a) 
        [?parent :block/children ?b ] 
        (ancestor ?parent ?a) ] ] ]`;
let blocks = window.roamAlphaAPI.q(`[ 
  :find ?block ?uids ?strings
  :in $ ?pagetitle % 
  :where 
      [?block :block/uid ?uids] 
      [?block :block/string ?strings]
      [?page :node/title ?pagetitle] 
      (ancestor ?block ?page)
  ]`, pageTitle, ancestorrule);
  return blocks;
}

function findPageLinks(string,startIndex = 0){
	// check string for largest sets of matching [[]]
	// return array of the contents of what is inside [[]] and where they start
	// to also check for #[[]] to exclude

	searching = false;
	openBrackets = 0;
  resultArray = [];

	for (j = startIndex; j < string.length - 1; j++) {

    //console.log(j);

		// check for open brackets [[
		if (string[j] == '[' && string[j+1] == '[') {
			//console.log("Found open brackets at " + j);

			if (!searching){
				startIndex = j + 2; // get inside of the text
				searching = true;	
				//console.log("searching, start index = " + startIndex);
			}
			else {
				// openBrackets increment by 1
				openBrackets++;
        //console.log("open brackets = "+ openBrackets);
				continue;
			}
      j++; // skip following [
		}

		else if (string[j] == ']' && string[j+1] == ']') {
      //console.log("Found closed brackets at " + j);
			
      if (searching){

				// if openBrackets > 0, close the inner ones
				if (openBrackets > 0){
					openBrackets--;
          j++;
          //console.log("open brackets = " + openBrackets);
					continue;	
				}

				// otherwise, we found a match!
				else {

          //console.log(string.substring(startIndex,j));
          searching = false;
          //console.log("Looking for next match");
          // ignore tags...
          if (!(string[startIndex - 3] == "#")){
            resultArray.push(string.substring(startIndex,j));
          }
				}
			}
		}
	}
  return resultArray;
}

function getPageRefCount(pageTitle){
  count = window.roamAlphaAPI.q(`[
  :find (count ?referencingBlock)
  :in $ ?pagetitle
  :where
  [?referencingBlock :block/refs ?referencedPage]
  [?referencedPage :node/title ?pagetitle]
]`, pageTitle);
  
  return count[0][0];
}

function getPageRefCounts(zettelBlocks){
  testArray = []; 
	for (ind = 0; ind < zettelBlocks.length; ind++){
      pageLinks = findPageLinks(zettelBlocks[ind][2]);
      if (pageLinks.length == 1){
		    pageRefCount = getPageRefCount(pageLinks[0]);
        testArray.push([zettelBlocks[ind][1],zettelBlocks[ind][2],pageLinks[0],pageRefCount]);
      }
}
	return testArray;
}

function appendPageRefsToString(blockString,numPageRefs){

  // check if page ref count exists already
  var regex = /\(\d+ page refs\)/g;
  var checkString = blockString.search(regex);

  // if doesn't exist, append
  if (checkString === -1){
    newString = blockString.concat(" (" + numPageRefs + " page refs)");
  }
  
  // if exists, update
  else {
    newString = blockString.substring(0,checkString-1).concat(" (" + numPageRefs + " page refs)");
  }
  
  return newString;
}

function updateBlockString(blockUID,blockString){
  window
  .roamAlphaAPI
  .updateBlock({"block": 
                {"uid": blockUID,
                 "string": blockString}});
}

function displayPageRefs(pageTitle){
  blocks = getBlocksOnPage(pageTitle);
  pageRefs = getPageRefCounts(blocks);

  newBlocks = pageRefs;

  for (i = 0; i < pageRefs.length; i++){
    newString = appendPageRefsToString(pageRefs[i][1],pageRefs[i][3]);
    newBlocks[i][1] = newString;

    updateBlockString(newBlocks[i][0],newBlocks[i][1]);
  }

  return newBlocks;
}
