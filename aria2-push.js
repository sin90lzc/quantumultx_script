let url = $request.url;

// 你远程 Aria2 的地址和密钥
let aria2_host = "https://a2d.8v8.fun:4443/jsonrpc";
let token = "SpIwIwGdmp0dwgX";

let body = {
    "jsonrpc": "2.0",
    "method": "aria2.addUri",
    "id": new Date().getTime(),
    "params": [
        `token:${token}`,
        [url],
        {
            "dir": "/downloads/book/yueting_wulinchuanqi" // 指定保存路径
        }
    ]
};

let headers = { "Content-Type": "application/json" };

$httpClient.post({
    url: aria2_host,
    headers: headers,
    body: JSON.stringify(body)
}, function (err, resp, data) {
    if (err) {
        console.log("❌ 推送 Aria2 失败: " + err);
    } else {
        console.log("✅ 推送成功: " + url);
    }
    $done({});
});
