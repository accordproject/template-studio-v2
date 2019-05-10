export const updateSampleMockAction = value => ({
  type: 'UPDATE_SAMPLE_MOCK',
  sample: value,
});

export const updateSampleMockSuccess = sample => ({
  type: 'UPDATE_SAMPLE_MOCK_SUCCEEDED',
  sample,
});
