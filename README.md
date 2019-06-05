# Ngx-Tinynodes

This repository is a collection of Angular components and demos with full documentation.

See the [Changelog](https://github.com/tanepiper/ngx-tinynodes/blob/master/CHANGELOG.md) for the
development diary of this site, or visit [the documentation of libraries](https://github.com/tanepiper/ngx-tinynodes/blob/master/libs/README.md).

You can also find a fully searchable API documentation for all `@tinynode` components.

## Links

- [Repository](https://github.com/tanepiper/ngx-tinynodes)
- [Documentation](https://tanepiper.github.io/ngx-tinynodes/)
- [Demo Application Site](https://tinynodes-ngx.firebaseapp.com/)
- [NPM Collection](https://www.npmjs.com/org/tinynodes)

## Libraries

### `ngx-editorjs`

This library provides Angular support for [EditorJS](https://editorjs.io). Inside the module you will find:

- `NgxEditorJSDirective` - An Angular Directive used to attach an `EditorJS` instance to any block DOM element
- `NgxEditorJSComponent` - An [out-of-the-box Angular component](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo/angular-component) that is Reactive Forms compatible
- `NgxEditorJSMaterialFieldComponent` An [Angular Material](https://material.angular.io) Form Field component that provides all the required properties and life-cycle events required. See the [Form Demo](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo/angular-form) on an example usage
- `NgxEditorJSService` - A Service that can be injected into an application to provide a interface to interact with `EditorJS` instances. Underneath are the private `NgxEditorJSPluginService` and `NgxEditorJSInstanceService` services. These are private but can be imported via `ɵNgxEditorJSPluginService` and `ɵNgxEditorJSInstanceService` from the library if you want to use them.

Within these components you will be able to access the underlying `EditorJS` instance, for use see the [EditorJS API Docs](https://editorjs.io/api)

Below are the dependencies to use the features.

#### `@tinynodes/ngx-editorjs`

This project provides a set of features for using [EditorJS](https://editorjs.io) within Angular 7+

- [Readme](https://github.com/tanepiper/ngx-tinynodes/blob/master/libs/ngx-editorjs/README.md)
- [Changelog](https://github.com/tanepiper/ngx-tinynodes/blob/master/libs/ngx-editorjs/CHANGELOG.md)
- [Demo](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo/pages)
- [Project Folder](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs)

#### `@tinynodes/ngx-editorjs-plugins`

This project provides the plugin service module that exports handles
 plugins for `@tinynodes/ngx-editorjs`. The module also ships a set of default
 plugins and documentation on how to add new ones easily.

- [Readme](https://github.com/tanepiper/ngx-tinynodes/blob/master/libs/ngx-editorjs-plugins/README.md)
- [Changelog](https://github.com/tanepiper/ngx-tinynodes/blob/master/libs/ngx-editorjs-plugins/CHANGELOG.md)
- [Project Folder](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs-plugins)

### Development Information

This repository is run by [Tane Piper](https://tane.dev) and was generated using [Nx](https://nx.dev).
