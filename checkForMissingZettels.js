// can probably combine the two functions in datalog itself...

function getBlocksInCommon(tag1,tag2){
  var blocksInCommon = window.roamAlphaAPI.q(`[:find ?blocks
                                       :in $ [?tag1 ?tag2]
                                       :where [?t1id :node/title ?tag1]
                                              [?t2id :node/title ?tag2]
                                              [?blocks :block/refs ?t1id]
                                              [?blocks :block/refs ?t2id]]`,[tag1,tag2]);

  return blocksInCommon.map((data, index) => {return data[0];});  
}

function getPagesNotOnIndexPage(container,blocksInCommon){
    let ancestor = `[ 
  [(ancestor ?child ?parent)
   [?parent :block/children ?child]]
  [(ancestor ?child ?ancestor)
   [?parent :block/children ?child]
   (ancestor ?parent ?ancestor)]
]`;

var blocks = window.roamAlphaAPI.q(`
[:find ?page_title
  :in $ % ?container_title [?tagged_block ...]
  :where 
    [?container_page :node/title ?container_title]
    [?tagged_block :block/page ?page]
    [?page :node/title ?page_title]
    (not (ancestor ?container_block ?container_page)
         [?container_block :block/refs ?page])
]`, ancestor, container, blocksInCommon);

  return blocks.map((data, index) => {return `[[${data[0]}]]`});
}

return getPagesNotOnIndexPage('[[Zettelkasten]] Index',getBlocksInCommon('Page Type', 'Zettel')).map((data, index) => {return `${data}`}).join('\n');

