(async () => {
    const getContent = r => r.url() && !r.url().startsWith('data:') && r.contentData();
    const nodes = UI.panels.network.networkLogView.dataGrid.rootNode().flatChildren();
    const requests = nodes.map(n => n.request());
    const contents = await Promise.all(requests.map(getContent));
    const looks = contents.map((data, i) => {
        const r = requests[i];
        const url = r.url();
        const content = !data ? 'data is encoded inside the data url already, duh' :
            r.contentType().isTextType() ? data :
                Common.ContentProvider.contentAsDataURL(data, r.mimeType, r.contentEncoded());
        return { url, content };
    });
    console.log(looks);
})();