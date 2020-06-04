/* eslint-disable no-useless-escape */
import React from 'react'
import _ from 'lodash'
import { domToReact } from 'html-react-parser'
import SharedComponents from './SharedComponents'

export function getParseOptions(props) {
  return ({
    replace: ({ attribs, name, children }) => {
      if (!attribs) return
      if (attribs.id === 'pageFooter' || attribs.id === 'pageHeader' || name === 'script' || name === 'head') return (<></>)
      if (name === 'html' || name === 'body') {
        return <>{domToReact(children, getParseOptions(props))}</>
      }

      if (attribs.id === 'pageContent') {
        return <>{domToReact(children, getParseOptions(props))}</>
      }

      if (name.includes('-')) {
        const component = _.upperFirst(_.camelCase(name))
        return React.createElement(SharedComponents[component], { ...attribs, props })
      }
    }
  })
}

export function slugify(string) {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export const decodeURLParams = search => {
  const hashes = search.slice(search.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
    const split = hash.indexOf("=");

    if (split < 0) {
      return Object.assign(params, {
        [hash]: null
      });
    }

    const key = hash.slice(0, split);
    const val = hash.slice(split + 1);

    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

