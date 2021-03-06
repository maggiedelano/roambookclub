// finds notes missing from an index based on their starting prefix e.g. [[Evergreen]]/

function getMissingNotes(pagePrefix){
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
]`, ancestor, "Zettel Index",buddingPages.map((data, index) => {return `${data[0]}`}));
  
return missingPages.map((data, index) => {return `[[${data[0]}]]`}).join('\n');
}
