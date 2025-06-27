// Quantumult X HTTP Backend：可自增 + 重置的计数器接口

const url = $request.url;
const query = url.split("?")[1] || "";
const params = Object.fromEntries(query.split("&").map(p => p.split("=")));

// 获取参数
const series = params.series || "default";
const reset = params.reset === "1";
const start = parseInt(params.start || "1", 10);
const key = `counter_${series}`;

let next = 1;

if (reset) {
  // 重置计数器
  $persistentStore.write(String(start), key);
  next = start;
  console.log(`🔁 计数器重置：${series} => ${start}`);
} else {
  // 读取现有值并加1
  const current = parseInt($persistentStore.read(key) || "0", 10);
  next = current + 1;
  $persistentStore.write(String(next), key);
  console.log(`➕ 计数器递增：${series} => ${next}`);
}

// 响应 JSON
$done({
  status: 200,
  body: JSON.stringify({ series, next, reset })
});
