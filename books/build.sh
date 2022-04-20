for book in $(find ../markdown -name "book.toml"); do
  bookDir=$(dirname $book)
  echo "Building $bookDir"
  cp -r ./themes/ $bookDir
  mdbook build $bookDir
done