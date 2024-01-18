const widgetProps = [
  { key: 'unit_widget1', props: { title: '접속유저', tag: 'Unique Event Count', value: 0, variance: 0 } },
  { key: 'unit_widget2', props: { title: '접속횟수', tag: 'Total Event Count', value: 0, variance: 0 } },
  { key: 'dau_widget', props: { title: 'DAU', data: [] } },
  { key: 'pie_widget', props: { title: 'Top Referral', data: [] } },
  { key: 'grid_widget', props: { title: 'Top Referral', data: [] } }
]

const defaultLayout = [
  { x: 0, y: 0, w: 5, h: 3, i: 0 },
  { x: 5, y: 0, w: 5, h: 3, i: 1 },
  { x: 0, y: 0, w: 10, h: 6, i: 2 },
  { x: 0, y: 0, w: 5, h: 6, i: 3 },
  { x: 5, y: 0, w: 5, h: 6, i: 4 }
]

// const localstorage = null

export const setLayout = (components = {}) => {
  const layout = []
  const savedLayout = JSON.parse(localStorage.getItem('layout'))
  const initLayout = savedLayout || [...defaultLayout]

  // 기본 porps + 변경된 props 통합
  for (const { i, ...info } of initLayout) {
    const item = widgetProps[i]
    const { component = null, props: newProps = {} } = components[item.key]
    const props = { ...item.props, ...newProps }

    layout.push({ i, ...info, ...item, props, component })
  }

  // console.log(layout)
  return layout
}
