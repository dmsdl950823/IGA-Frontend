const widgetProps = [
  { key: 'unit_widget1', props: { title: '접속유저', tag: 'Unique Event Count', value: 0, variance: 0 } },
  { key: 'unit_widget2', props: { title: '접속횟수', tag: 'Total Event Count', value: 0, variance: 0 } },
  { key: 'dau_widget', props: { title: 'DAU', data: [] } },
  { key: 'pie_widget', props: { title: 'Top Referral', data: [] } },
  { key: 'grid_widget', props: { title: 'Top Referral', data: [] } }
]

const defaultLayout = [
  { x: 0, y: 0, w: 5, h: 3, idx: 0 },
  { x: 5, y: 0, w: 5, h: 3, idx: 1 },
  { x: 0, y: 0, w: 10, h: 6, idx: 2 },
  { x: 0, y: 0, w: 5, h: 6, idx: 3 },
  { x: 5, y: 0, w: 5, h: 6, idx: 4 }
]

// const localstorage = null

export const setLayout = (components = {}) => {
  const layout = []
  // if (localstorage)

  // 기본 porps + 변경된 props 통합
  for (const { idx, ...info } of defaultLayout) {
    const item = widgetProps[idx]
    const { component = null, props: newProps = {} } = components[item.key]
    const props = { ...item.props, ...newProps }

    layout.push({ i: idx, ...info, ...item, props, component })
  }

  // console.log(layout)
  return layout
}
