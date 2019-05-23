export const markdownChanged = (markdown) => {
  console.log('type', typeof markdown);
  return ({
    type: 'MARKDOWN_CHANGED',
    markdown,
  });
};
