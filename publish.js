var ghpages = require("gh-pages");

ghpages.publish(
  "public",
  { branch: "master", repo: "https://github.com/anpigon/anpigon.github.io.git" },
  function (err) {
    if(err) console.error(err);
    console.log('Done');
  }
);
