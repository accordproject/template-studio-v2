/* Saga */
// import { delay } from "redux-saga";
import { all, takeLatest, put } from "redux-saga/effects";



export function* pushTemplatesToStore(templates) {
    console.log('Saga here: ', templates)
    yield put({ type: 'AP_TEMPLATES_RECEIVED', templates });










    // const json = yield fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    //   .then(response => response.json(), );
  
    // yield put({ type: 'AP_TEMPLATES_RECEIVED', json: json.articles, });
}


function* actionWatcher() {
    yield takeLatest('AP_TEMPLATES_RECEIVED', pushTemplatesToStore)
}



export default function* rootSaga() {
    yield pushTemplatesToStore();
}