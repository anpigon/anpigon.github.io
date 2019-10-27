const steem = require("steem");
const path = require("path");
const fs = require("fs");
const package = require("./package.json");

async function updateSteemArticles(username) {
  const results = await steem.api.getDiscussionsByBlogAsync({ limit: 100, tag: username });
  for(const item of results) {
    if (item.author == username) {
        const tags = JSON.parse(item.json_metadata).tags || [];
        const title = item.title.replace(/"(.*)"/g, "“$1”").replace(/"/g, "“");
        const body = item.body
          .replace(/\|/g, "|")
          .replace(/%/g, "％")
          .replace(/{/g, "｛")
          .replace(/}/g, "｝");
        const contents = [
          "---",
          `title: "${title}"`,
          `author: ${item.author}`,
          `date: "${item.created}Z"`,
          // `path: "${category}/@${author}/${permlink}"`,
          `tags:`,
          ...tags.map(tag => `  - "${tag}"`),
          "---",
          `${body}`
        ];
        const date = new Date(`${item.created}Z`);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date
          .getDate()
          .toString()
          .padStart(2, "0");
        const fileName = `${year}-${month}-${day}---${item.permlink}`;
        fs.writeFileSync(
          path.join(__dirname, `/source/_posts/${fileName}.md`),
          contents.join("\n"),
          "utf8"
        );
      }
  }
}

updateSteemArticles("anpigon");
