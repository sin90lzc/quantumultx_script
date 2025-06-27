// Quantumult X 脚本：推送匹配请求到 Aria2 下载器

(async () => {
  const url = $request.url;

  const aria2Host = "https://a2d.8v8.fun:4443/jsonrpc"; // ← 请替换
  const token = "SpIwIwGdmp0dwgX";                          // ← 请替换为你的 Aria2 rpc-secret
  const downloadDir = "/downloads/book/yueting_wulinchuanqi";           // ← Aria2 的保存目录（容器内路径）

  const json = {
    jsonrpc: "2.0",
    method: "aria2.addUri",
    id: Date.now().toString(),
    params: [
      `token:${token}`,
      [url],
      {
        dir: downloadDir
      }
    ]
  };

  try {
    const res = await $task.fetch({
      method: "POST",
      url: aria2Host,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });

    console.log(`✅ 成功推送到 Aria2: ${url}`);
  } catch (e) {
    console.log(`❌ 推送失败: ${e}`);
  }

  $done({});
})();
