function getPagesNotOnIndexPage(container,tag1,tag2){
    let ancestor = `[ 
  [(ancestor ?child ?parent)
   [?parent :block/children ?child]]
  [(ancestor ?child ?ancestor)
   [?parent :block/children ?child]
   (ancestor ?parent ?ancestor)]
]`;

var blocks = window.roamAlphaAPI.q(`
[:find ?page_title
  :in $ % ?container_title ?tag1 ?tag2
  :where
    [?t1id :node/title ?tag1]
    [?t2id :node/title ?tag2]
    [?blocks :block/refs ?t1id]
    [?blocks :block/refs ?t2id] 
    [?container_page :node/title ?container_title]
    [?blocks :block/page ?page]
    [?page :node/title ?page_title]
    (not (ancestor ?container_block ?container_page)
         [?container_block :block/refs ?page])
]`, ancestor, container, tag1,tag2);

  return blocks.map((data, index) => {return `[[${data[0]}]]`});
}

return getPagesNotOnIndexPage('[[Zettelkasten]] Index','Zettel','Page Type').map((data, index) => {return `${data}`}).join('\n');

