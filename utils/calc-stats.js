const fs = require('fs');

const books = fs.readdirSync('../markdown/');

const stats = [];

for (const book of books) {
  try {
    const summary = fs.readFileSync(`../markdown/${book}/SUMMARY.md`).toString();
    const name = summary.match(/# (.+)\n/)[1] ?? book;
    const allChapters = summary.match(/\(/g)?.length ?? 0;
    const blankChapters = summary.match(/\(\)/g)?.length ?? 0;
    const doneChapters = (allChapters - blankChapters) - 1; // Don't count the title page
    const progress = Math.round((doneChapters / allChapters) * 100)
    stats.push({
      name,
      link: book,
      progress,
      status: doneChapters < 1 ? 'Not Started' :
        progress === 100 ? 'Done' :
          'In Progress'
    })
  } catch {
    console.log('No summary found for book', book);
  }
}

fs.writeFileSync('src/_data/transcriptions.json', JSON.stringify(stats));