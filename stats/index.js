const fs = require('fs');
require('toml-require').install();

const books = fs.readdirSync('../markdown/').flatMap(subdir => fs.readdirSync(`../markdown/${subdir}`).map(book => `${subdir}/${book}`));

const stats = [];

for (const book of books) {
  try {
    const bookToml = require(`../markdown/${book}/book.toml`);
    const summary = fs.readFileSync(`../markdown/${book}/SUMMARY.md`).toString();
    const name = summary.match(/# (.+)\n/)[1] ?? book;
    const allChapters = summary.match(/\]\(/g)?.length ?? 0;
    const blankChapters = summary.match(/\]\(\)/g)?.length ?? 0;
    const doneChapters = (allChapters - blankChapters);
    const progress = (doneChapters === 1) ? 0 : Math.round((doneChapters / allChapters) * 100) // Don't count the title page if it's the only one
    stats.push({
      name,
      link: bookToml['site-url'],
      summary: bookToml.book.summary,
      progress,
      done: progress === 100,
      status: progress === 0 ? 'Not Started' :
        progress === 100 ? 'Done' :
          'In Progress'
    })
  } catch {
    console.log('Error loading book', book);
  }
}

stats.sort((a, b) => {
  const result = a.name.localeCompare(b.name);
  return result;
})

try {
  fs.mkdirSync('dist');
} catch { }

fs.writeFileSync('dist/books.json', JSON.stringify(stats));
