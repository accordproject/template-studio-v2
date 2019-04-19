export const getTemplates = (templates) => {
  console.log('templates in action creator', templates)
  return ({
    type: 'GET_AP_TEMPLATES',
    templates,
  })
};
