import list from '../datas/list.json' assert {type: 'json'};
import responses from '../responses.json' assert {type: 'json'};
import fs from 'fs';



function convertDataResponse() {
    return responses.map(res => {
        res.content.content = JSON.parse(res.content.content);
        return res
    });
}

function filterResponse(res) {
    return res.filter(row => !!row?.content?.content?.data?.node?.pageItems)
}




function appendList(responses) {

    responses.forEach(res => {
        res.content.content.data.node.pageItems.edges.forEach((edge) => {
            list.imageURIs.push(edge.node.node.viewer_image.uri);
        });


        console.log('list', list);
        try {
            fs.writeFileSync('../datas/list.json', JSON.stringify(list));
        } catch (error) {
            console.log(error);
        }
    })


}


// appendList();

const convertedResponses = convertDataResponse();
const filteredResponses = filterResponse(convertedResponses);

appendList(filteredResponses);
