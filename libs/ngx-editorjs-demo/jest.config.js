module.exports = {
  name: 'ngx-editorjs-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-editorjs-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
