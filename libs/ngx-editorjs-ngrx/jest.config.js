module.exports = {
  name: 'ngx-editorjs-ngrx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-editorjs-ngrx',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
