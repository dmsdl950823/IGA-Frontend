/**
 * 간단하게 sorting 할 수 있는 함수
 * @param {Array} data
 * @param {String} key
 * @returns {Array}
 */
export const sorting = (data, key, type = 'asc') => {
  if (!key) {
    console.error('sorting 키는 필수값이에요')
    return data
  }

  const value = {
    asc: { a: -1, b: 1 },
    desc: { a: 1, b: -1 }
  }[type]

  data.sort((a, b) => {
    if (a[key] < b[key]) return value.a
    else if (a[key] > b[key]) return value.b
    return 0
  })

  return data
}

/**
 * 데이터 fetching 해서 가져온 데이터를 동일하게 formatting 해줌
 * @param {Array} data
 * @returns {Array}
 */
export const dataFormatter = data => {
  const { headers, rows } = data

  const chart = rows.map(row => {
    const item = {}

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      const value = row[i]

      const setType = {
        long: val => Number(val)
      }[header.value_type]

      item[header.key] = setType ? setType(value) : value
    }

    return item
  })

  return chart
}
