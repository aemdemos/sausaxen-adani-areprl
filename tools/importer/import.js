/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import cardsNoImages1Parser from './parsers/cardsNoImages1.js';
import cardsNoImages3Parser from './parsers/cardsNoImages3.js';
import accordion10Parser from './parsers/accordion10.js';
import hero9Parser from './parsers/hero9.js';
import columns4Parser from './parsers/columns4.js';
import cards14Parser from './parsers/cards14.js';
import cards13Parser from './parsers/cards13.js';
import columns2Parser from './parsers/columns2.js';
import columns12Parser from './parsers/columns12.js';
import cards18Parser from './parsers/cards18.js';
import columns16Parser from './parsers/columns16.js';
import cards11Parser from './parsers/cards11.js';
import columns8Parser from './parsers/columns8.js';
import hero19Parser from './parsers/hero19.js';
import columns7Parser from './parsers/columns7.js';
import carousel24Parser from './parsers/carousel24.js';
import columns25Parser from './parsers/columns25.js';
import columns23Parser from './parsers/columns23.js';
import tableBordered26Parser from './parsers/tableBordered26.js';
import cardsNoImages28Parser from './parsers/cardsNoImages28.js';
import columns22Parser from './parsers/columns22.js';
import columns20Parser from './parsers/columns20.js';
import cards30Parser from './parsers/cards30.js';
import columns36Parser from './parsers/columns36.js';
import cards37Parser from './parsers/cards37.js';
import tabs32Parser from './parsers/tabs32.js';
import columns34Parser from './parsers/columns34.js';
import columns39Parser from './parsers/columns39.js';
import columns40Parser from './parsers/columns40.js';
import columns17Parser from './parsers/columns17.js';
import columns6Parser from './parsers/columns6.js';
import hero44Parser from './parsers/hero44.js';
import carousel43Parser from './parsers/carousel43.js';
import columns41Parser from './parsers/columns41.js';
import columns42Parser from './parsers/columns42.js';
import columns50Parser from './parsers/columns50.js';
import carousel15Parser from './parsers/carousel15.js';
import cards52Parser from './parsers/cards52.js';
import accordion21Parser from './parsers/accordion21.js';
import columns55Parser from './parsers/columns55.js';
import columns51Parser from './parsers/columns51.js';
import columns53Parser from './parsers/columns53.js';
import columns57Parser from './parsers/columns57.js';
import columns58Parser from './parsers/columns58.js';
import columns56Parser from './parsers/columns56.js';
import columns59Parser from './parsers/columns59.js';
import carousel49Parser from './parsers/carousel49.js';
import columns61Parser from './parsers/columns61.js';
import columns29Parser from './parsers/columns29.js';
import hero63Parser from './parsers/hero63.js';
import carousel62Parser from './parsers/carousel62.js';
import columns33Parser from './parsers/columns33.js';
import hero64Parser from './parsers/hero64.js';
import accordion65Parser from './parsers/accordion65.js';
import cards66Parser from './parsers/cards66.js';
import columns45Parser from './parsers/columns45.js';
import columns68Parser from './parsers/columns68.js';
import cards67Parser from './parsers/cards67.js';
import columns73Parser from './parsers/columns73.js';
import columns60Parser from './parsers/columns60.js';
import cards76Parser from './parsers/cards76.js';
import cards71Parser from './parsers/cards71.js';
import cards77Parser from './parsers/cards77.js';
import cards69Parser from './parsers/cards69.js';
import carousel74Parser from './parsers/carousel74.js';
import cards70Parser from './parsers/cards70.js';
import columns81Parser from './parsers/columns81.js';
import columns82Parser from './parsers/columns82.js';
import cards80Parser from './parsers/cards80.js';
import cards79Parser from './parsers/cards79.js';
import cards78Parser from './parsers/cards78.js';
import columns75Parser from './parsers/columns75.js';
import carousel46Parser from './parsers/carousel46.js';
import accordion84Parser from './parsers/accordion84.js';
import columns83Parser from './parsers/columns83.js';
import columns72Parser from './parsers/columns72.js';
import columns5Parser from './parsers/columns5.js';
import columns38Parser from './parsers/columns38.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  cardsNoImages1: cardsNoImages1Parser,
  cardsNoImages3: cardsNoImages3Parser,
  accordion10: accordion10Parser,
  hero9: hero9Parser,
  columns4: columns4Parser,
  cards14: cards14Parser,
  cards13: cards13Parser,
  columns2: columns2Parser,
  columns12: columns12Parser,
  cards18: cards18Parser,
  columns16: columns16Parser,
  cards11: cards11Parser,
  columns8: columns8Parser,
  hero19: hero19Parser,
  columns7: columns7Parser,
  carousel24: carousel24Parser,
  columns25: columns25Parser,
  columns23: columns23Parser,
  tableBordered26: tableBordered26Parser,
  cardsNoImages28: cardsNoImages28Parser,
  columns22: columns22Parser,
  columns20: columns20Parser,
  cards30: cards30Parser,
  columns36: columns36Parser,
  cards37: cards37Parser,
  tabs32: tabs32Parser,
  columns34: columns34Parser,
  columns39: columns39Parser,
  columns40: columns40Parser,
  columns17: columns17Parser,
  columns6: columns6Parser,
  hero44: hero44Parser,
  carousel43: carousel43Parser,
  columns41: columns41Parser,
  columns42: columns42Parser,
  columns50: columns50Parser,
  carousel15: carousel15Parser,
  cards52: cards52Parser,
  accordion21: accordion21Parser,
  columns55: columns55Parser,
  columns51: columns51Parser,
  columns53: columns53Parser,
  columns57: columns57Parser,
  columns58: columns58Parser,
  columns56: columns56Parser,
  columns59: columns59Parser,
  carousel49: carousel49Parser,
  columns61: columns61Parser,
  columns29: columns29Parser,
  hero63: hero63Parser,
  carousel62: carousel62Parser,
  columns33: columns33Parser,
  hero64: hero64Parser,
  accordion65: accordion65Parser,
  cards66: cards66Parser,
  columns45: columns45Parser,
  columns68: columns68Parser,
  cards67: cards67Parser,
  columns73: columns73Parser,
  columns60: columns60Parser,
  cards76: cards76Parser,
  cards71: cards71Parser,
  cards77: cards77Parser,
  cards69: cards69Parser,
  carousel74: carousel74Parser,
  cards70: cards70Parser,
  columns81: columns81Parser,
  columns82: columns82Parser,
  cards80: cards80Parser,
  cards79: cards79Parser,
  cards78: cards78Parser,
  columns75: columns75Parser,
  carousel46: carousel46Parser,
  accordion84: accordion84Parser,
  columns83: columns83Parser,
  columns72: columns72Parser,
  columns5: columns5Parser,
  columns38: columns38Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
