const fs = require('fs');

const books = fs.readdirSync('../markdown/').flatMap(subdir => fs.readdirSync(`../markdown/${subdir}`).map(book => `${subdir}/${book}`));

const stats = [];

for (const book of books) {
  try {
    const bookToml = fs.readFileSync(`../markdown/${book}/book.toml`).toString();
    const link = bookToml.match(/site\-url = "\/william\-perkins\/(.+)"/)[1] ?? '';
    const summary = fs.readFileSync(`../markdown/${book}/SUMMARY.md`).toString();
    const name = summary.match(/# (.+)\n/)[1] ?? book;
    const allChapters = summary.match(/\]\(/g)?.length ?? 0;
    const blankChapters = summary.match(/\]\(\)/g)?.length ?? 0;
    const doneChapters = (allChapters - blankChapters);
    const progress = (doneChapters === 1) ? 0 : Math.round((doneChapters / allChapters) * 100) // Don't count the title page if it's the only one
    stats.push({
      name,
      link,
      progress,
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

fs.writeFileSync('src/_data/transcriptions.json', JSON.stringify(stats));
