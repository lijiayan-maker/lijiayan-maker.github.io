import { readFileSync } from "node:fs";

const lockfile = readFileSync(
  new URL("../pnpm-lock.yaml", import.meta.url),
  "utf8",
);
const allowedHosts = new Set(["registry.npmjs.org"]);
const hosts = new Set();
const gitDependency = lockfile.match(
  /^\s*(?:resolution|tarball|version):.*(?:git\+|github\.com\/|gitlab\.com\/|bitbucket\.org\/)/im,
);

if (gitDependency) {
  console.error(`lockfile 包含需要人工确认的 Git 依赖：${gitDependency[0].trim()}`);
  process.exit(1);
}

for (const line of lockfile.split("\n")) {
  // 弃用说明中的文档链接不是依赖下载地址。
  if (/^\s*deprecated:/.test(line)) continue;

  for (const match of line.matchAll(/https?:\/\/[^\s"'()<>]+/gi)) {
    try {
      hosts.add(new URL(match[0]).hostname.toLowerCase());
    } catch {
      console.error(`无法解析 lockfile 中的 URL：${match[0]}`);
      process.exit(1);
    }
  }
}

const unexpectedHosts = [...hosts].filter((host) => !allowedHosts.has(host));

if (unexpectedHosts.length > 0) {
  console.error(
    `pnpm-lock.yaml 包含未允许的 registry 主机：\n${unexpectedHosts
      .map((host) => `- ${host}`)
      .join("\n")}`,
  );
  process.exit(1);
}

console.log("lockfile registry 检查通过。");
