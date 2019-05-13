'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Tinynodes Angular Documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/tinynodes-library-docs.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-ca88ec7b85d4d30c1ba6341c020a7464"' : 'data-target="#xs-additional-page-ca88ec7b85d4d30c1ba6341c020a7464"' }>
                                                <span class="link-name">Tinynodes Library Docs</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-ca88ec7b85d4d30c1ba6341c020a7464"' : 'id="xs-additional-page-ca88ec7b85d4d30c1ba6341c020a7464"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/tinynodes-library-docs/ngx-editorjs-readme.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">ngx-editorjs Readme</a>
                                            </li>
                                            <li class="link for-chapter3">
                                                <a href="additional-documentation/tinynodes-library-docs/ngx-editorjs-readme/ngx-editorjs-changelog.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">ngx-editorjs Changelog</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/tinynodes-library-docs/ngx-editorjs-plugins-readme.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">ngx-editorjs-plugins Readme</a>
                                            </li>
                                            <li class="link for-chapter3">
                                                <a href="additional-documentation/tinynodes-library-docs/ngx-editorjs-plugins-readme/ngx-editorjs-plugins-changelog.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">ngx-editorjs-plugins Changelog</a>
                                            </li>
                                        </ul>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApplicationDataModule.html" data-type="entity-link">ApplicationDataModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApplicationDataModule-8a2c46eefb197db73af50fb03f39404b"' : 'data-target="#xs-injectables-links-module-ApplicationDataModule-8a2c46eefb197db73af50fb03f39404b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicationDataModule-8a2c46eefb197db73af50fb03f39404b"' :
                                        'id="xs-injectables-links-module-ApplicationDataModule-8a2c46eefb197db73af50fb03f39404b"' }>
                                        <li class="link">
                                            <a href="injectables/ApplicationQuery.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplicationQuery</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApplicationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplicationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApplicationStore.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplicationStore</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4db08d7a8cbab9ad6bd6238591599d8d"' : 'data-target="#xs-components-links-module-AppModule-4db08d7a8cbab9ad6bd6238591599d8d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4db08d7a8cbab9ad6bd6238591599d8d"' :
                                            'id="xs-components-links-module-AppModule-4db08d7a8cbab9ad6bd6238591599d8d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CodeModule.html" data-type="entity-link">CodeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CodeModule-5b658f3e004c52c857c84366970374da"' : 'data-target="#xs-injectables-links-module-CodeModule-5b658f3e004c52c857c84366970374da"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CodeModule-5b658f3e004c52c857c84366970374da"' :
                                        'id="xs-injectables-links-module-CodeModule-5b658f3e004c52c857c84366970374da"' }>
                                        <li class="link">
                                            <a href="injectables/PluginCode.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginCode</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageModule.html" data-type="entity-link">ImageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImageModule-29d911617eea879a1e51953dd5e7156c"' : 'data-target="#xs-injectables-links-module-ImageModule-29d911617eea879a1e51953dd5e7156c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImageModule-29d911617eea879a1e51953dd5e7156c"' :
                                        'id="xs-injectables-links-module-ImageModule-29d911617eea879a1e51953dd5e7156c"' }>
                                        <li class="link">
                                            <a href="injectables/PluginImage.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginImage</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LinkModule.html" data-type="entity-link">LinkModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LinkModule-af7c2138499cc4b996e8889a28369332"' : 'data-target="#xs-injectables-links-module-LinkModule-af7c2138499cc4b996e8889a28369332"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LinkModule-af7c2138499cc4b996e8889a28369332"' :
                                        'id="xs-injectables-links-module-LinkModule-af7c2138499cc4b996e8889a28369332"' }>
                                        <li class="link">
                                            <a href="injectables/PluginLink.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginLink</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MarkerModule.html" data-type="entity-link">MarkerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MarkerModule-21bf0c10ca1bfacb50c8410f4bb6d27b"' : 'data-target="#xs-injectables-links-module-MarkerModule-21bf0c10ca1bfacb50c8410f4bb6d27b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MarkerModule-21bf0c10ca1bfacb50c8410f4bb6d27b"' :
                                        'id="xs-injectables-links-module-MarkerModule-21bf0c10ca1bfacb50c8410f4bb6d27b"' }>
                                        <li class="link">
                                            <a href="injectables/PluginMarker.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginMarker</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorjsDemoModule.html" data-type="entity-link">NgxEditorjsDemoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxEditorjsDemoModule-0a1776920e17779c5b7f0fa3903f9361"' : 'data-target="#xs-components-links-module-NgxEditorjsDemoModule-0a1776920e17779c5b7f0fa3903f9361"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorjsDemoModule-0a1776920e17779c5b7f0fa3903f9361"' :
                                            'id="xs-components-links-module-NgxEditorjsDemoModule-0a1776920e17779c5b7f0fa3903f9361"' }>
                                            <li class="link">
                                                <a href="components/EditorPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditorPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorJSModule.html" data-type="entity-link">NgxEditorJSModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' : 'data-target="#xs-components-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' :
                                            'id="xs-components-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' }>
                                            <li class="link">
                                                <a href="components/NgxEditorJSComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' : 'data-target="#xs-directives-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' :
                                        'id="xs-directives-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' }>
                                        <li class="link">
                                            <a href="directives/NgxEditorJSDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' : 'data-target="#xs-injectables-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' :
                                        'id="xs-injectables-links-module-NgxEditorJSModule-a669823e22c4352d07accbf9e70f3d09"' }>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PluginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorJSPluginServiceModule.html" data-type="entity-link">NgxEditorJSPluginServiceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgxEditorJSPluginServiceModule-0dfabf3e25d71413a365c3072b33982a"' : 'data-target="#xs-injectables-links-module-NgxEditorJSPluginServiceModule-0dfabf3e25d71413a365c3072b33982a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgxEditorJSPluginServiceModule-0dfabf3e25d71413a365c3072b33982a"' :
                                        'id="xs-injectables-links-module-NgxEditorJSPluginServiceModule-0dfabf3e25d71413a365c3072b33982a"' }>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSPluginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSPluginService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorjsPluginsModule.html" data-type="entity-link">NgxEditorjsPluginsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PageStoreModule.html" data-type="entity-link">PageStoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PageStoreModule-cb0f688a6a6358c8d0bc89d8c7bf1cf4"' : 'data-target="#xs-injectables-links-module-PageStoreModule-cb0f688a6a6358c8d0bc89d8c7bf1cf4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PageStoreModule-cb0f688a6a6358c8d0bc89d8c7bf1cf4"' :
                                        'id="xs-injectables-links-module-PageStoreModule-cb0f688a6a6358c8d0bc89d8c7bf1cf4"' }>
                                        <li class="link">
                                            <a href="injectables/PagesQuery.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PagesQuery</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PagesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PagesStore.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PagesStore</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginCodeModule.html" data-type="entity-link">PluginCodeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginCodeModule-87d15724131de9bee2a348a05c53e6c6"' : 'data-target="#xs-injectables-links-module-PluginCodeModule-87d15724131de9bee2a348a05c53e6c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginCodeModule-87d15724131de9bee2a348a05c53e6c6"' :
                                        'id="xs-injectables-links-module-PluginCodeModule-87d15724131de9bee2a348a05c53e6c6"' }>
                                        <li class="link">
                                            <a href="injectables/PluginCode.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginCode</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginHeaderModule.html" data-type="entity-link">PluginHeaderModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginHeaderModule-bf44308eb33a41ad8f78a6b4c5b0822c"' : 'data-target="#xs-injectables-links-module-PluginHeaderModule-bf44308eb33a41ad8f78a6b4c5b0822c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginHeaderModule-bf44308eb33a41ad8f78a6b4c5b0822c"' :
                                        'id="xs-injectables-links-module-PluginHeaderModule-bf44308eb33a41ad8f78a6b4c5b0822c"' }>
                                        <li class="link">
                                            <a href="injectables/PluginHeader.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginHeader</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginHeaderModule.html" data-type="entity-link">PluginHeaderModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4-1"' : 'data-target="#xs-injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4-1"' :
                                        'id="xs-injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4-1"' }>
                                        <li class="link">
                                            <a href="injectables/PluginHeader.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginHeader</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginImageModule.html" data-type="entity-link">PluginImageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginImageModule-5ae097ac2e3064965945a9b45bc74236"' : 'data-target="#xs-injectables-links-module-PluginImageModule-5ae097ac2e3064965945a9b45bc74236"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginImageModule-5ae097ac2e3064965945a9b45bc74236"' :
                                        'id="xs-injectables-links-module-PluginImageModule-5ae097ac2e3064965945a9b45bc74236"' }>
                                        <li class="link">
                                            <a href="injectables/PluginImage.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginImage</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginLinkModule.html" data-type="entity-link">PluginLinkModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginLinkModule-b61a77f03dc78fd4f1f331a372cba82d"' : 'data-target="#xs-injectables-links-module-PluginLinkModule-b61a77f03dc78fd4f1f331a372cba82d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginLinkModule-b61a77f03dc78fd4f1f331a372cba82d"' :
                                        'id="xs-injectables-links-module-PluginLinkModule-b61a77f03dc78fd4f1f331a372cba82d"' }>
                                        <li class="link">
                                            <a href="injectables/PluginLink.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginLink</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginListModule.html" data-type="entity-link">PluginListModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginListModule-ef5fd19e6b88b490398f8648ac43ad0d"' : 'data-target="#xs-injectables-links-module-PluginListModule-ef5fd19e6b88b490398f8648ac43ad0d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginListModule-ef5fd19e6b88b490398f8648ac43ad0d"' :
                                        'id="xs-injectables-links-module-PluginListModule-ef5fd19e6b88b490398f8648ac43ad0d"' }>
                                        <li class="link">
                                            <a href="injectables/PluginList.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginList</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginListModule.html" data-type="entity-link">PluginListModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55-1"' : 'data-target="#xs-injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55-1"' :
                                        'id="xs-injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55-1"' }>
                                        <li class="link">
                                            <a href="injectables/PluginList.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginList</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginMarkerModule.html" data-type="entity-link">PluginMarkerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginMarkerModule-5c46e2d3dc72e6e12dcbe895b7e08762"' : 'data-target="#xs-injectables-links-module-PluginMarkerModule-5c46e2d3dc72e6e12dcbe895b7e08762"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginMarkerModule-5c46e2d3dc72e6e12dcbe895b7e08762"' :
                                        'id="xs-injectables-links-module-PluginMarkerModule-5c46e2d3dc72e6e12dcbe895b7e08762"' }>
                                        <li class="link">
                                            <a href="injectables/PluginMarker.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginMarker</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginParagraphModule.html" data-type="entity-link">PluginParagraphModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginParagraphModule-7a9b483a258a55e505891463b9c25375"' : 'data-target="#xs-injectables-links-module-PluginParagraphModule-7a9b483a258a55e505891463b9c25375"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginParagraphModule-7a9b483a258a55e505891463b9c25375"' :
                                        'id="xs-injectables-links-module-PluginParagraphModule-7a9b483a258a55e505891463b9c25375"' }>
                                        <li class="link">
                                            <a href="injectables/PluginParagraph.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginParagraph</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginParagraphModule.html" data-type="entity-link">PluginParagraphModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74-1"' : 'data-target="#xs-injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74-1"' :
                                        'id="xs-injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74-1"' }>
                                        <li class="link">
                                            <a href="injectables/PluginParagraph.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginParagraph</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginSimpleImageModule.html" data-type="entity-link">PluginSimpleImageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginSimpleImageModule-7a8a52e06037019ae919582daff40c16"' : 'data-target="#xs-injectables-links-module-PluginSimpleImageModule-7a8a52e06037019ae919582daff40c16"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginSimpleImageModule-7a8a52e06037019ae919582daff40c16"' :
                                        'id="xs-injectables-links-module-PluginSimpleImageModule-7a8a52e06037019ae919582daff40c16"' }>
                                        <li class="link">
                                            <a href="injectables/PluginSimpleImage.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginSimpleImage</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SimpleImageModule.html" data-type="entity-link">SimpleImageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SimpleImageModule-c645fd5cb83c22424457c75dd62efbb8"' : 'data-target="#xs-injectables-links-module-SimpleImageModule-c645fd5cb83c22424457c75dd62efbb8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SimpleImageModule-c645fd5cb83c22424457c75dd62efbb8"' :
                                        'id="xs-injectables-links-module-SimpleImageModule-c645fd5cb83c22424457c75dd62efbb8"' }>
                                        <li class="link">
                                            <a href="injectables/PluginSimpleImage.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginSimpleImage</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApplicationState.html" data-type="entity-link">ApplicationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasePlugin.html" data-type="entity-link">BasePlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasePlugin-1.html" data-type="entity-link">BasePlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Block.html" data-type="entity-link">Block</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlocksMap.html" data-type="entity-link">BlocksMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangeMap.html" data-type="entity-link">ChangeMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSConfig.html" data-type="entity-link">EditorJSConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorMap.html" data-type="entity-link">EditorMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Header.html" data-type="entity-link">Header</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderBlock.html" data-type="entity-link">HeaderBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Image.html" data-type="entity-link">Image</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageBlock.html" data-type="entity-link">ImageBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/List.html" data-type="entity-link">List</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListBlock.html" data-type="entity-link">ListBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSConfig.html" data-type="entity-link">NgxEditorJSConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Page.html" data-type="entity-link">Page</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageBlock.html" data-type="entity-link">PageBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PagesState.html" data-type="entity-link">PagesState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paragraph.html" data-type="entity-link">Paragraph</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParagraphBlock.html" data-type="entity-link">ParagraphBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluginConfig.html" data-type="entity-link">PluginConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluginConfig-1.html" data-type="entity-link">PluginConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReadyMap.html" data-type="entity-link">ReadyMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolSettingsMap.html" data-type="entity-link">ToolSettingsMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolSettingsMap-1.html" data-type="entity-link">ToolSettingsMap</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});