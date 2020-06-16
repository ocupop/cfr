/* eslint-disable no-useless-escape */
import React from 'react'
import _ from 'lodash'
import { domToReact } from 'html-react-parser'
import SharedComponents from '../SharedComponents'
import format from 'date-fns/format'
import queryString from 'query-string'

/**
 * Formats a date object
 *
 * @param {DateTime} date
 */
export const formatDate = date => {
  let dateFormated = ''
  if (date) {
    dateFormated = format(new Date(date), 'MMMM dd, yyyy')
  }
  return dateFormated
}

export const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(e => Object.assign({}, e[1], { id: e[0] }))
  }
}

export const formatToPhone = number => {
  const input = number.replace(/\D/g, '').substring(0, 10) // First ten digits of input only
  const zip = input.substring(0, 3)
  const middle = input.substring(3, 6)
  const last = input.substring(6, 10)
  return `(${zip}) ${middle} - ${last}`
}

/**
 * Returns a money amount
 * For more information on Intl.NumberFormat see: https://stackoverflow.com/a/16233919
 *
 * @param {float} Money Amount
 */
// export const formatMoney = moneyAmount => {
//   const fromatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
//   })

//   return fromatter.format(moneyAmount)
// }
export const formatMoney = (amount, currency = '$', decimalCount = 2, decimal = '.', thousands = ',') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return currency + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log('Error formatting value:', e)
  }
}

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
export function getElementParseOptions() {
  return ({
    replace: ({ attribs, name }) => {
      if (!attribs) return;

      if (name.includes('-')) {
        const component = _.upperFirst(_.camelCase(name))
        // @TODO: Write logic to check if component isExists. If not - throw error
        return React.createElement(SharedComponents[component], attribs)
      }
    }
  })
}

export const getFilter = (query) => {
  const defaultFilter = ''
  if (query) {
    const queriedFilter = queryString.parse(query)
    const { filter } = queriedFilter
    return filter
  }
  return defaultFilter
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

export function encodeID(id) {
  return window.btoa(`gid://shopify/Product/${id}`)
}


export function getPriceRange({ variants }) {
  const minPrice = variants.reduce((min, b) => Math.min(min, b.price), variants[0].price)
  const maxPrice = variants.reduce((max, b) => Math.max(max, b.price), variants[0].price)
  if (minPrice === maxPrice) {
    return formatMoney(minPrice)
  }
  return `${formatMoney(minPrice)} - ${formatMoney(maxPrice)}`
}

export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})