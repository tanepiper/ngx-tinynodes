# Tinynodes Changelog

<div class="alert alert-info">
This changelog is related to the overall site. You can also find changelogs for libraries <a href="additional-documentation/tinynodes-library-docs.html">under the library docs</a>
</div>

## Wednesday, 22nd May 2019

Today `@tinynodes/ngx-editorjs@2.0.0` has been released. The major bump is due to underlying changes that may be breaking - the entire service has been improved with better control over the `EditorJS` interface. Also in this release the exiting component has been upgraded to work with Angular Forms, and there is a new Material Form Field component provided too.

The demo has also been updated to reflect the new features of this, and a new demo added for the Material component.

## Wednesday, 15th May 2019

Today I have released `@tinynodes/ngx-editorjs@1.3.2`. This will be without a Forms component. In this release the main change is internally I'm using a new [EditorJS Injector module](/modules/EditorJSInstanceModule.html) I've created to handle managing the underlying instance. There are also a lot of documentation improvements and a completly new [updated demo site](https://tinynodes-ngx.firebaseapp.com).

## Monday, 13th May 2019

Today I have released `@tinynodes/ngx-editorjs@1.2.0`. For now I've removed any default plugins from core package, now all plugins must be added at the application level - this can be see in [the demo app](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs-demo).

## Sunday, 12th May 2019

The first devlog is to report that currently `version 1.2` has been delayed due to current build issues.
A [bug report has been filed](https://github.com/nrwl/nx/issues/1077) on `@nrwl/nx` project.

In 1.2 there is a new [`@tinynodes/ngx-editorjs-plugins`](https://www.npmjs.com/package/@tinynodes/ngx-editorjs-plugins) module that provides exports for several common `EditorJS` plugins and will be expanded to cover all the officially released plugins.

With this change the current build scripts break, and until it is resolved this will block the release.

In the meantime I'll continue to work on this small demo site, making it more useful as a good example of an Angular app.
