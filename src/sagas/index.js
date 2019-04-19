import { all, takeLatest, put } from "redux-saga/effects";

export function* pushTemplatesToStore(action) {
    yield put({ type: 'AP_TEMPLATES_RECEIVED', templates: action.templates });
}

function* actionWatcher() {
    yield takeLatest('GET_AP_TEMPLATES', pushTemplatesToStore)
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}