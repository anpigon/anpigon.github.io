const steem = require("steem");
const path = require("path");
const fs = require("fs");
const package = require("./package.json");

// const out = '/source/_posts/';
const out = "/source/_drafts/";

async function updateSteemArticles(username, start_author, start_permlink) {
  console.log(username, start_author, start_permlink)
  const results = await steem.api.getDiscussionsByBlogAsync({
    limit: 10,
    tag: username,
    start_author,
    start_permlink
  });
  for (const item of results) {
    if (item.author == username) {
      const tags = JSON.parse(item.json_metadata).tags || [];
      const title = item.title.replace(/"(.*)"/g, "“$1”").replace(/"/g, "“");
      const body = item.body;
        // .replace(/\|/g, "|")
        // .replace(/%/g, "％")
        // .replace(/{/g, "｛")
        // .replace(/}/g, "｝");
      const contents = [
        "---",
        `title: "${title}"`,
        `author: ${item.author}`,
        `date: "${item.created}Z"`,
        // `permalink: "${category}/@${author}/${permlink}"`,
        `permalink: "${item.url}"`,
        `tags:`,
        ...tags.map(tag => `  - "${tag}"`),
        "---",
        `${body}`,
        '\n<hr>\n',
        `<sub>이 글은 [스팀잇](https://steemit.com/trending/hive-196917)에서 작성되었습니다.</sub>\n<sup>[https://steemit.com${item.url}](https://steemit.com${item.url})</sup>`
      ];
      const date = new Date(`${item.created}Z`);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0");
      const fileName = `${year}-${month}-${day}---${item.permlink}`;
      if (!tags.includes("book"))
        fs.writeFileSync(
          path.join(__dirname, `${out}/${fileName}.md`),
          contents.join("\n"),
          "utf8"
        );
    }
  }

  if (results.length >= 100) {
    const { author, permlink } = results.pop();
    await updateSteemArticles(username, author, permlink );
  }
}

updateSteemArticles("anpigon");
