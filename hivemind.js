// add two commands for use in Smart blocks:
// getMissingNotes(pagePrefix,indexPage)
// getRandomPage(indexTag)

// getMissingNotes called using GETMISSINGX where X is
// TERMS, SOURCES, PROPOSITIONS, QUESTIONS

function getMissingNotes(pagePrefix, indexPage){
  let ancestor = `[ 
  [(ancestor ?child ?parent)
   [?parent :block/children ?child]]
  [(ancestor ?child ?ancestor)
   [?parent :block/children ?child]
   (ancestor ?parent ?ancestor)]
]`;

var allPages = window.roamAlphaAPI.q(`
[:find ?name
  :in $ % ?tag
  :where
    [_ :node/title ?name]
    [(clojure.string/starts-with? ^String ?name ?tag)]]
]`, ancestor,pagePrefix);
  
var missingPages = window.roamAlphaAPI.q(`
[:find ?pages
  :in $ % ?container_title [?pages ...]
  :where
    [?container_page :node/title ?container_title]
    [?page :node/title ?pages]
    (not (ancestor ?container_block ?container_page)
         [?container_block :block/refs ?page])
]`, ancestor, indexPage,allPages.map((data, index) => {return `${data[0]}`}));
  
return missingPages.map((data, index) => {return `[[${data[0]}]]`});
}


// add get missing sources
function getMissingSources(){
  return getMissingNotes('S/','Sources');
}

const callbackS = () => getMissingSources();

window.roamjs.extension.smartblocks.registerCommand({
  text: "GETMISSINGSOURCES",
  handler: (context) => callbackS,
});

// add get missing terms
function getMissingTerms(){
  return getMissingNotes('T/','Terms');
}

const callbackT = () => getMissingTerms();

window.roamjs.extension.smartblocks.registerCommand({
  text: "GETMISSINGTERMS",
  handler: (context) => callbackT,
});

// add get missing propositions
function getMissingPropositions(){
  return getMissingNotes('P/','Propositions');
}

const callbackP = () => getMissingPropositions();

window.roamjs.extension.smartblocks.registerCommand({
  text: "GETMISSINGPROPOSITIONS",
  handler: (context) => callbackP,
});

// add get missing questions
function getMissingQuestions(){
  return getMissingNotes('Q/','Questions');
}

const callbackQ = () => getMissingQuestions();

window.roamjs.extension.smartblocks.registerCommand({
  text: "GETMISSINGQUESTIONS",
  handler: (context) => callbackQ,
});