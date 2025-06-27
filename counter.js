// Quantumult X HTTP Backend 脚本 - 持久计数器（基于 $prefs）

const url = $request.url;
const query = url.split("?")[1] || "";
const params = Object.fromEntries(query.split("&").map(p => p.split("=")));

const series = params.series || "default";
const reset = params.reset === "1";
const start = parseInt(params.start || "1", 10);
const key = `counter_${series}`;

let next = 1;

if (reset) {
  $prefs.setValueForKey(String(start), key);
  next = start;
  console.log(`🔁 计数器已重置：${series} = ${start}`);
} else {
  const current = parseInt($prefs.valueForKey(key) || "0", 10);
  next = current + 1;
  $prefs.setValueForKey(String(next), key);
  console.log(`➕ 计数器递增：${series} = ${next}`);
}

$done({
  status: 200,
  body: JSON.stringify({ series, next, reset })
});
