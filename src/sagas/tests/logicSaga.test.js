import { updateLogicOnStore } from '../logicSaga';
import { recordSaga } from '../../utilities/test/sagaTest';
import { updateLogicMockSuccess } from '../../actions/logicActions';

describe('updateLogicOnStore', () => {
  it('should dispatch the action updateLogicMockSuccess', async () => {
    const dispatched = await recordSaga(
      updateLogicOnStore,
      updateLogicMockSuccess,
    );
    expect(dispatched[0].type).toEqual('UPDATE_LOGIC_MOCK_SUCCEEDED');
  });

  it('should update logic with a logic value in the action', async () => {
    const dispatched = await recordSaga(
      updateLogicOnStore,
      updateLogicMockSuccess('Any logic value'),
    );
    expect(dispatched[0].logic).toEqual('Any logic value');
  });
});
