import http from 'https';
import fs from 'fs';
import list from '../datas/list.json' assert {type: 'json'};
let count = 1;
async function download(URI) {
    console.log(URI)
    return new Promise((resolvePromise) => {
        const file = fs.createWriteStream(`./output/${count}.jpeg`);
        http.get(URI, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolvePromise());
                count++;
            });
        });
    });
}


(async () => {
    for (let URI of list.imageURIs) {
        await download(URI);
    }
})()


// copy(UI.panels.network.networkLogView.dataGrid.rootNode().flatNodes.map(n => n.request().url()).join('\n'))



// (async () => {
//     const getContent = r => r.url() && !r.url().startsWith('data:') && r.contentData();
//     const nodes = UI.panels.network.networkLogView.dataGrid.rootNode().flatChildren();
//     const requests = nodes.map(n => n.request());
//     const contents = await Promise.all(requests.map(getContent));
//     const looks = contents.map((data, i) => {
//       const r = requests[i];
//       const url = r.url();
//       const content = !data ? 'data is encoded inside the data url already, duh' :
//         r.contentType().isTextType() ? data :
//           Common.ContentProvider.contentAsDataURL(data, r.mimeType, r.contentEncoded());
//       return {url, content};
//     });
//     console.log(looks);
//   })();