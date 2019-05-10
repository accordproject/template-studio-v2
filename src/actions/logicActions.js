export const updateLogicMockAction = value => ({
  type: 'UPDATE_LOGIC_MOCK',
  logic: value,
});

export const updateLogicMockSuccess = logic => ({
  type: 'UPDATE_LOGIC_MOCK_SUCCEEDED',
  logic,
});
