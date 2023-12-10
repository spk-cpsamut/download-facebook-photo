import list from './datas/list.json' assert {type: 'json'};



function checkDuplicate() {
    const map = {};
    const duplicateList = [];
    const pushedMap = {};
    list.imageURIs.forEach(URI => {
        if (map[URI] && !pushedMap[URI]) {
            duplicateList.push(URI);
            pushedMap[URI];
        } else {
            map[URI]
        }
    });

    console.log(duplicateList);
}


checkDuplicate();