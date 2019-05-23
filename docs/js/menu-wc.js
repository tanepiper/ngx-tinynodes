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
                                <a href="modules/NgxEditorJSModule.html" data-type="entity-link">NgxEditorJSModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' : 'data-target="#xs-components-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' :
                                            'id="xs-components-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' }>
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
                                        'data-target="#directives-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' : 'data-target="#xs-directives-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' :
                                        'id="xs-directives-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' }>
                                        <li class="link">
                                            <a href="directives/NgxEditorJSDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' : 'data-target="#xs-injectables-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' :
                                        'id="xs-injectables-links-module-NgxEditorJSModule-3fb62d6eb2d123c93e3a70b739e815a3"' }>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorjsPluginsModule.html" data-type="entity-link">NgxEditorjsPluginsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginCodeModule.html" data-type="entity-link">PluginCodeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PluginCodeModule-9ca672d98505f26d90fa07e1a203aa9e"' : 'data-target="#xs-injectables-links-module-PluginCodeModule-9ca672d98505f26d90fa07e1a203aa9e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginCodeModule-9ca672d98505f26d90fa07e1a203aa9e"' :
                                        'id="xs-injectables-links-module-PluginCodeModule-9ca672d98505f26d90fa07e1a203aa9e"' }>
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
                                        'data-target="#injectables-links-module-PluginHeaderModule-f916012d97d6c689f4bb23480332513f"' : 'data-target="#xs-injectables-links-module-PluginHeaderModule-f916012d97d6c689f4bb23480332513f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginHeaderModule-f916012d97d6c689f4bb23480332513f"' :
                                        'id="xs-injectables-links-module-PluginHeaderModule-f916012d97d6c689f4bb23480332513f"' }>
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
                                        'data-target="#injectables-links-module-PluginImageModule-60d6bd74f71dfeb74fcc16bd727a4590"' : 'data-target="#xs-injectables-links-module-PluginImageModule-60d6bd74f71dfeb74fcc16bd727a4590"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginImageModule-60d6bd74f71dfeb74fcc16bd727a4590"' :
                                        'id="xs-injectables-links-module-PluginImageModule-60d6bd74f71dfeb74fcc16bd727a4590"' }>
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
                                        'data-target="#injectables-links-module-PluginLinkModule-d6c4d2b03f78c880167c1659f1b36f02"' : 'data-target="#xs-injectables-links-module-PluginLinkModule-d6c4d2b03f78c880167c1659f1b36f02"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginLinkModule-d6c4d2b03f78c880167c1659f1b36f02"' :
                                        'id="xs-injectables-links-module-PluginLinkModule-d6c4d2b03f78c880167c1659f1b36f02"' }>
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
                                        'data-target="#injectables-links-module-PluginListModule-e90b67e5a8d05bc314f5143782581eea"' : 'data-target="#xs-injectables-links-module-PluginListModule-e90b67e5a8d05bc314f5143782581eea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginListModule-e90b67e5a8d05bc314f5143782581eea"' :
                                        'id="xs-injectables-links-module-PluginListModule-e90b67e5a8d05bc314f5143782581eea"' }>
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
                                        'data-target="#injectables-links-module-PluginMarkerModule-57003172ea6cd45a18efcef57576e4cb"' : 'data-target="#xs-injectables-links-module-PluginMarkerModule-57003172ea6cd45a18efcef57576e4cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginMarkerModule-57003172ea6cd45a18efcef57576e4cb"' :
                                        'id="xs-injectables-links-module-PluginMarkerModule-57003172ea6cd45a18efcef57576e4cb"' }>
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
                                        'data-target="#injectables-links-module-PluginParagraphModule-d9d5232b371bb80ae3f8cf2ee0f52508"' : 'data-target="#xs-injectables-links-module-PluginParagraphModule-d9d5232b371bb80ae3f8cf2ee0f52508"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginParagraphModule-d9d5232b371bb80ae3f8cf2ee0f52508"' :
                                        'id="xs-injectables-links-module-PluginParagraphModule-d9d5232b371bb80ae3f8cf2ee0f52508"' }>
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
                                        'data-target="#injectables-links-module-PluginSimpleImageModule-4eeef6cd370c3d832e2662f8a3aa6d8d"' : 'data-target="#xs-injectables-links-module-PluginSimpleImageModule-4eeef6cd370c3d832e2662f8a3aa6d8d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PluginSimpleImageModule-4eeef6cd370c3d832e2662f8a3aa6d8d"' :
                                        'id="xs-injectables-links-module-PluginSimpleImageModule-4eeef6cd370c3d832e2662f8a3aa6d8d"' }>
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
                                <a href="interfaces/BasePlugin-1.html" data-type="entity-link">BasePlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Block.html" data-type="entity-link">Block</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangeMap.html" data-type="entity-link">ChangeMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateEditorJSOptions.html" data-type="entity-link">CreateEditorJSOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSChange.html" data-type="entity-link">EditorJSChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSClass.html" data-type="entity-link">EditorJSClass</a>
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
                                <a href="interfaces/NgxEditorJSConfig.html" data-type="entity-link">NgxEditorJSConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSModuleConfig.html" data-type="entity-link">NgxEditorJSModuleConfig</a>
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
                                <a href="interfaces/PluginsMap.html" data-type="entity-link">PluginsMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReadyMap.html" data-type="entity-link">ReadyMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedMap.html" data-type="entity-link">SavedMap</a>
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