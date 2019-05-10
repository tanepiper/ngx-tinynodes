module.exports = {
  name: 'ngx-editorjs-plugins',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-editorjs-plugins',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
