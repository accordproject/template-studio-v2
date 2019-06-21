import { TemplateLibrary } from '@accordproject/cicero-core';
import { addNewTemplateToStore, pushTemplatesToStore } from '../templatesSaga';
import { recordSaga } from '../../utilities/test/sagaTest';

const mockedTemplateIndex = [{
  ciceroVersion: '^0.12.0',
  description: 'This clause allows the receiver of goods to inspect them for a given time period after delivery.',
  name: 'acceptance-of-delivery',
  type: 1,
  uri: 'ap://acceptance-of-delivery@0.11.0#311de48109cce10e6b2e33ef183ccce121886d0b76754d649d5054d1084f93cd',
  url: 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.11.0.cta',
  version: '0.11.0',
}];

jest.mock('@accordproject/cicero-core', () => ({
  TemplateLibrary: jest.fn(),
}));

beforeEach(() => {
  jest.resetModules();
});

describe('pushTemplatesToStore', () => {
  it('should dispatch the action getTemplatesSuccess', async () => {
    TemplateLibrary.mockImplementation(() => ({
      getTemplateIndex: () => Promise.resolve(mockedTemplateIndex),
    }));
    const dispatched = await recordSaga(
      pushTemplatesToStore,
    );
    expect(dispatched[0].type).toEqual('GET_AP_TEMPLATES_SUCEEDED');
  });

  it('should receive an array of templates from accordproject.org', async () => {
    TemplateLibrary.mockImplementation(() => ({
      getTemplateIndex: () => Promise.resolve(mockedTemplateIndex),
    }));
    const dispatched = await recordSaga(
      pushTemplatesToStore,
    );
    expect(dispatched[0].templates[0].url).toContain('templates.accordproject.org');
  });

  it('should dispatch an error if templates fetch fails', async () => {
    TemplateLibrary.mockImplementation(() => ({
      getTemplateIndex: () => Promise.reject(new Error('Unable to recieve templates')),
    }));
    const dispatched = await recordSaga(
      pushTemplatesToStore,
    );
    expect(dispatched[0].type).toContain('ADD_APP_ERROR');
  });
});

describe('addNewTemplateToStore', () => {
  it('should dispatch the action addNewTemplateSuccess', async () => {
    const dispatched = await recordSaga(
      addNewTemplateToStore,
    );
    expect(dispatched[0].type).toEqual('ADD_NEW_TEMPLATE_SUCCEEDED');
  });

  it('should add a template with a stock name', async () => {
    const dispatched = await recordSaga(
      addNewTemplateToStore,
    );
    expect(dispatched[0].template.name).toContain('Temporary New Template');
  });
});
