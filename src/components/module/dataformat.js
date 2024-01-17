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

/**
 * Tree 형식으로 가공
 * @param { Array } data
 * @param { Object } groupKeys // 키를 여러개 받으면 그거에 맞춰서 가공함 [key-value] 용으로 사용(키는 순서를 맞춰서 넣어야 함)
 */
export const dataGrouper = (data = [], groupKeys = { codes: [], value: undefined }) => {
  const { codes, value } = groupKeys
  if (!codes.length) return
  const max = codes.length

  // const recursion = items => {
  //   if (!items.children) return
  // }

  // 1차 그룹핑
  const grouping = (items, codeIdx) => {
    const group = {}
    const code = codes[codeIdx]

    for (const item of items) {
      const key = item[code]
      const d = { value: item[value], ...item, raw: item }

      if (group[key]) group[key].push(d)
      else group[key] = [d] // _children 은 삭제용
    }

    const result = []
    for (const key in group) {
      const children = group[key]
      const item = { label: key, value: 0 }

      // 코드 key 나열 순서대로 재귀함수 실행
      if (codeIdx < max) {
        if (children.length) item.children = grouping(children, codeIdx + 1)
        else item.raw = children[0] // 마지막 자식인 경우
      }

      result.push(item)
    }

    return result
  }

  const result = grouping(data, 0)
  console.log(result)
}
