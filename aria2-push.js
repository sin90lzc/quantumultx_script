// Quantumult X 脚本：推送匹配请求到 Aria2 下载器

(async () => {
  // 读取 URL 参数
  function getQueryParams(url) {
    const queryString = url.split("?")[1] || "";
    return Object.fromEntries(queryString.split("&").map(p => p.split("=")));
  }
  const url = $request.url;
  const query = getQueryParams(url);
  const series = query.series || "default";
  const token = query.token || "";

  const aria2Host = "https://a2d.8v8.fun:4443/jsonrpc"; // ← 请替换
  
  const downloadDir = "/downloads/book/"+series;           // ← Aria2 的保存目录（容器内路径）
  
  let episodeNumber = "000";
  
  try {
    const res = await $task.fetch({
      method: "GET",
      url: `http://qx.local/counter?series=${series}`
    });
    const json = JSON.parse(res.body);
    episodeNumber = String(json.next).padStart(3, "0");
  } catch (e) {
    console.log("❌ 获取集数编号失败：" + e);
  }
  const filename = `${series}${episodeNumber}.mp3`;
  const json = {
    jsonrpc: "2.0",
    method: "aria2.addUri",
    id: Date.now().toString(),
    params: [
      `token:${token}`,
      [url],
      {
        dir: downloadDir,
        out: filename
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
