/*
Copyright 2016 Mozilla

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
*/

import { takeEvery, call, put } from 'redux-saga/effects';

import DeveloperActions from '../actions/developer-actions';
import DeveloperModelActions from '../actions/developer-model-actions';
import ReactPerf from '../../shared/util/react-perf';

function* startRecording() {
  yield call([ReactPerf, ReactPerf.start]);
  yield put(DeveloperModelActions.setPerfRecordingRunning());
}

function* stopRecording({ payload: { logMeasured } }) {
  yield call([ReactPerf, ReactPerf.stop]);
  yield put(DeveloperModelActions.setPerfRecordingNotRunning());

  if (logMeasured) {
    yield put(DeveloperActions.commands.perf.printMeasured());
  }
}

function* printMeasured() {
  const lastMeasurements = yield call([ReactPerf, ReactPerf.getLastMeasurements]);
  yield call([ReactPerf, ReactPerf.printWasted], lastMeasurements);
}

export default function* () {
  yield [
    takeEvery(DeveloperActions.commands.perf.startRecording, startRecording),
    takeEvery(DeveloperActions.commands.perf.stopRecording, stopRecording),
    takeEvery(DeveloperActions.commands.perf.printMeasured, printMeasured),
  ];
}
