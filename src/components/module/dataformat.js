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

  if (data.length < 2) return data

  data.sort((a, b) => {
    // console.log(a, b, key)
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
 * Grid 그룹핑을 위한 데이터 가공
 */
export const dataGrouper = (data = [], groupKeys = { codes: [], value: undefined }) => {
  const { codes, value } = groupKeys
  if (!codes.length) return
  const max = codes.length - 1

  // console.log(data, '기본 데이터')

  const grouping = (items, codeIdx) => {
    // N차 그룹핑
    const group = {}
    const code = codes[codeIdx]

    for (const item of items) {
      const key = item[code] || '-'
      // if (!key) continue // "" 인 경우가 있음 (제외? => 제외하면 데이터 수가 안맞음)

      const d = { ...item, raw: item }

      if (!group[key]) group[key] = { value: item[value], _children: [d] }
      else {
        group[key].value += item[value] // value 데이터 축적
        group[key]._children.push(d) // 자식 모으기
      }
    }

    // children 형식으로 변형
    const result = []
    for (const key in group) {
      // if (!key) continue // "" 인 경우가 있음 (제외? => 제외하면 데이터 수가 안맞음)

      const { value, _children } = group[key]
      const item = { label: key || '-', value }

      // 코드 key 나열 순서대로 재귀함수 실행
      if (codeIdx < max) {
        if (_children.length) item.children = grouping(_children, codeIdx + 1)
      }

      result.push(item)
    }

    return result
  }

  const result = grouping(data, 0)
  // console.log(result)
  return result
}
