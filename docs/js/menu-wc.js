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
                    <a href="index.html" data-type="index-link">ngx-tinynodes documentation</a>
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
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
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
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-b62bc6aca152646698598544a51ef778"' : 'data-target="#xs-components-links-module-AppModule-b62bc6aca152646698598544a51ef778"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b62bc6aca152646698598544a51ef778"' :
                                            'id="xs-components-links-module-AppModule-b62bc6aca152646698598544a51ef778"' }>
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
                                <a href="modules/NgxEditorjsDemoModule.html" data-type="entity-link">NgxEditorjsDemoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxEditorjsDemoModule-affb8334c0dcebd457be6705726284fe"' : 'data-target="#xs-components-links-module-NgxEditorjsDemoModule-affb8334c0dcebd457be6705726284fe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorjsDemoModule-affb8334c0dcebd457be6705726284fe"' :
                                            'id="xs-components-links-module-NgxEditorjsDemoModule-affb8334c0dcebd457be6705726284fe"' }>
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
                                            'data-target="#components-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' : 'data-target="#xs-components-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' :
                                            'id="xs-components-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' }>
                                            <li class="link">
                                                <a href="components/NgxEditorJSComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' : 'data-target="#xs-directives-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' :
                                        'id="xs-directives-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' }>
                                        <li class="link">
                                            <a href="directives/NgxEditorJSDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' : 'data-target="#xs-injectables-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' :
                                        'id="xs-injectables-links-module-NgxEditorJSModule-40ab51b696685c81a825ca3e634db81c"' }>
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
                                <a href="modules/PluginHeaderModule.html" data-type="entity-link">PluginHeaderModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4"' : 'data-target="#xs-injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4"' :
                                        'id="xs-injectables-links-module-PluginHeaderModule-e66ca4c1e3e3097a5da95c22a224a6b4"' }>
                                        <li class="link">
                                            <a href="injectables/PluginHeader.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginHeader</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginListModule.html" data-type="entity-link">PluginListModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55"' : 'data-target="#xs-injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55"' :
                                        'id="xs-injectables-links-module-PluginListModule-7bf46593460b0c0822c3991beb0afa55"' }>
                                        <li class="link">
                                            <a href="injectables/PluginList.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginList</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginParagraphModule.html" data-type="entity-link">PluginParagraphModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74"' : 'data-target="#xs-injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74"' :
                                        'id="xs-injectables-links-module-PluginParagraphModule-43c7ce1f1a8d168ede11bc979d870b74"' }>
                                        <li class="link">
                                            <a href="injectables/PluginParagraph.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PluginParagraph</a>
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
                                <a href="interfaces/BasePlugin.html" data-type="entity-link">BasePlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Block.html" data-type="entity-link">Block</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSConfig.html" data-type="entity-link">EditorJSConfig</a>
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
                                <a href="interfaces/NgxEditorJSTools.html" data-type="entity-link">NgxEditorJSTools</a>
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
                                <a href="interfaces/PluginMap.html" data-type="entity-link">PluginMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link">Tag</a>
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
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});