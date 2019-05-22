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
                                        'data-target="#injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f"' : 'data-target="#xs-injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f"' :
                                        'id="xs-injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApplicationQuery.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplicationQuery</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApplicationStore.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplicationStore</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ApplicationDataModule.html" data-type="entity-link">ApplicationDataModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f-1"' : 'data-target="#xs-injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f-1"' :
                                        'id="xs-injectables-links-module-ApplicationDataModule-1500f5be057670aa2778c5e346fe220f-1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApplicationQuery.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplicationQuery</a>
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
                                            'data-target="#components-links-module-AppModule-132bbe0023baa2f1c7af8ae8c240ecc6"' : 'data-target="#xs-components-links-module-AppModule-132bbe0023baa2f1c7af8ae8c240ecc6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-132bbe0023baa2f1c7af8ae8c240ecc6"' :
                                            'id="xs-components-links-module-AppModule-132bbe0023baa2f1c7af8ae8c240ecc6"' }>
                                            <li class="link">
                                                <a href="components/AppContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
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
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorjsDemoModule.html" data-type="entity-link">NgxEditorjsDemoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxEditorjsDemoModule-ec287d492a1e83137df670d5e0f3a0da"' : 'data-target="#xs-components-links-module-NgxEditorjsDemoModule-ec287d492a1e83137df670d5e0f3a0da"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorjsDemoModule-ec287d492a1e83137df670d5e0f3a0da"' :
                                            'id="xs-components-links-module-NgxEditorjsDemoModule-ec287d492a1e83137df670d5e0f3a0da"' }>
                                            <li class="link">
                                                <a href="components/FormContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NgxEditorJSDemoHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDemoHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NgxEditorJSDemoTagComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDemoTagComponent</a>
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
                                            'data-target="#components-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' : 'data-target="#xs-components-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' :
                                            'id="xs-components-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' }>
                                            <li class="link">
                                                <a href="components/NgxEditorJSBaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSBaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NgxEditorJSComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NgxEditorJSMatFieldComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSMatFieldComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' : 'data-target="#xs-directives-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' :
                                        'id="xs-directives-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' }>
                                        <li class="link">
                                            <a href="directives/NgxEditorJSDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' : 'data-target="#xs-injectables-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' :
                                        'id="xs-injectables-links-module-NgxEditorJSModule-44d4558b4b3253791a75b69ddfbe1f2c"' }>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSInstanceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSInstanceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSPluginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSPluginService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorjsNgrxModule.html" data-type="entity-link">NgxEditorjsNgrxModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorjsPluginsModule.html" data-type="entity-link">NgxEditorjsPluginsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxHideableHeaderDemoModule.html" data-type="entity-link">NgxHideableHeaderDemoModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxTinynodesCoreMaterialModule.html" data-type="entity-link">NgxTinynodesCoreMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxTinynodesCoreModule.html" data-type="entity-link">NgxTinynodesCoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxTinynodesCoreModule-e804dd41969313cd28381db3004d8e24"' : 'data-target="#xs-components-links-module-NgxTinynodesCoreModule-e804dd41969313cd28381db3004d8e24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxTinynodesCoreModule-e804dd41969313cd28381db3004d8e24"' :
                                            'id="xs-components-links-module-NgxTinynodesCoreModule-e804dd41969313cd28381db3004d8e24"' }>
                                            <li class="link">
                                                <a href="components/NgxEditorJSDemoInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDemoInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxTinynodesCoreModule.html" data-type="entity-link">NgxTinynodesCoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PageStoreModule.html" data-type="entity-link">PageStoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PageStoreModule-86d90c3a0ae357c2b13bbee8924eaaf0"' : 'data-target="#xs-injectables-links-module-PageStoreModule-86d90c3a0ae357c2b13bbee8924eaaf0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PageStoreModule-86d90c3a0ae357c2b13bbee8924eaaf0"' :
                                        'id="xs-injectables-links-module-PageStoreModule-86d90c3a0ae357c2b13bbee8924eaaf0"' }>
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
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Changed.html" data-type="entity-link">Changed</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockEditorJS.html" data-type="entity-link">MockEditorJS</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockPlugin.html" data-type="entity-link">MockPlugin</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotReady.html" data-type="entity-link">NotReady</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ready.html" data-type="entity-link">Ready</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveEnd.html" data-type="entity-link">SaveEnd</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveStart.html" data-type="entity-link">SaveStart</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestClass.html" data-type="entity-link">TestClass</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/MockNgZone.html" data-type="entity-link">MockNgZone</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxEditorJSEffects.html" data-type="entity-link">NgxEditorJSEffects</a>
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
                                <a href="interfaces/ApplicationData.html" data-type="entity-link">ApplicationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApplicationData-1.html" data-type="entity-link">ApplicationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApplicationState.html" data-type="entity-link">ApplicationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApplicationState-1.html" data-type="entity-link">ApplicationState</a>
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
                                <a href="interfaces/CreateEditorJSOptions.html" data-type="entity-link">CreateEditorJSOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DemoData.html" data-type="entity-link">DemoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DemoData-1.html" data-type="entity-link">DemoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSChange.html" data-type="entity-link">EditorJSChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSInstanceConfig.html" data-type="entity-link">EditorJSInstanceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSMaterialForm.html" data-type="entity-link">EditorJSMaterialForm</a>
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
                                <a href="interfaces/InjectorApiCallOptions.html" data-type="entity-link">InjectorApiCallOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectorApiCallResponse.html" data-type="entity-link">InjectorApiCallResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectorMethodOption.html" data-type="entity-link">InjectorMethodOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/List.html" data-type="entity-link">List</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListBlock.html" data-type="entity-link">ListBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuGroup.html" data-type="entity-link">MenuGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuGroup-1.html" data-type="entity-link">MenuGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link">MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-1.html" data-type="entity-link">MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSConfig.html" data-type="entity-link">NgxEditorJSConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSDemo.html" data-type="entity-link">NgxEditorJSDemo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSDemo-1.html" data-type="entity-link">NgxEditorJSDemo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSDemoData.html" data-type="entity-link">NgxEditorJSDemoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSDemoData-1.html" data-type="entity-link">NgxEditorJSDemoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSModuleConfig.html" data-type="entity-link">NgxEditorJSModuleConfig</a>
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
                                <a href="interfaces/SavedMap.html" data-type="entity-link">SavedMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TinynodeDemos.html" data-type="entity-link">TinynodeDemos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TinynodeDemos-1.html" data-type="entity-link">TinynodeDemos</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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