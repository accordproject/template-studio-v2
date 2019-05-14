import { updateSampleOnStore } from '../sampleSaga';
import { recordSaga } from '../../utilities/test/sagaTest';
import { updateSampleMockSuccess } from '../../actions/sampleActions';

describe('updateSampleOnStore', () => {
  it('should dispatch the action updateSampleMockSuccess', async () => {
    const dispatched = await recordSaga(
      updateSampleOnStore,
      updateSampleMockSuccess,
    );
    expect(dispatched[0].type).toEqual('UPDATE_SAMPLE_MOCK_SUCCEEDED');
  });

  it('should update logic with a logic value in the action', async () => {
    const dispatched = await recordSaga(
      updateSampleOnStore,
      updateSampleMockSuccess('Any sample value'),
    );
    expect(dispatched[0].sample).toEqual('Any sample value');
  });
});
