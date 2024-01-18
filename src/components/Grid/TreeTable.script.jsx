import { ref, reactive, watch } from 'vue'
import { sorting } from '@/components/module/dataformat'

import './TreeTable.styles.css'

const Node = {
  name: 'Node',
  props: ['label', 'value', 'children', 'depth', 'isOpen'],
  setup (props) {
    const isOpen = ref(props.isOpen)

    // 상위(부모) 상태가 변경되면 그에 따라 노드의 접힘 상태도 바뀜
    watch(() => props, (newValue) => {
      isOpen.value = newValue.isOpen
    }, { deep: true })

    // open 여부 결정
    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      toggle,
      props
    }
  },
  render () {
    const { depth, label, value, children } = this.props

    const hasChildren = (children && children.length) > 0
    const icon = hasChildren ? (<font-awesome-icon class="-toggle-icon" icon={['fas', this.isOpen ? 'circle-minus' : 'circle-plus']} onClick={this.toggle} />) : null // <div class="-empty" />
    const count = hasChildren ? `(${children.length})` : null

    return (
      <li class={['row', `-padding-${depth + 1}`]}>
        <div class="content grid grid-cols-2">
          <div class="flex items-center gap-2 -label">
            {/* { depth } */}
            {/* { this.isOpen ? 'Y' : 'N' } */}
            { icon }
            <span>{ label } { count }</span>
          </div>

          <div class="-value">{value}</div>
        </div>

        { hasChildren && this.isOpen ? <NodeList items={children} /> : null }
      </li>
    )
  }
}

const NodeList = {
  name: 'NodeList',
  props: ['items'],
  setup (props) {
    return { props }
  },
  render () {
    const { items } = this.props

    return (
      <ul class="-depth">
        { items.map((item, index) => <Node key={index} {...item} />) }
      </ul>
    )
  }
}

const THead = {
  name: 'THead',
  props: [],
  setup (props, { emit }) {
    const labelSorting = ref('asc')
    const valueSorting = ref('asc')

    const toggleLabelSort = () => {
      labelSorting.value = (labelSorting.value === 'asc') ? 'desc' : 'asc'
      emit('sort', { key: 'label', status: labelSorting.value })
    }

    const toggleValueSort = () => {
      valueSorting.value = (valueSorting.value === 'asc') ? 'desc' : 'asc'
      emit('sort', { key: 'value', status: valueSorting.value })
    }

    return {
      labelSorting,
      valueSorting,
      toggleLabelSort,
      toggleValueSort
    }
  },
  render () {
    const labelSortIcon = (this.labelSorting === 'asc') ? 'arrow-up-wide-short' : 'arrow-down-wide-short'
    const valueSortIcon = (this.valueSorting === 'asc') ? 'arrow-up-wide-short' : 'arrow-down-wide-short'

    return (
      <div class="tree-header">
        <div class="row">
          <div class="grid grid-cols-2">
            <div class="-label">GroupBy</div>
            <div class="-value">Matrics</div>
          </div>
        </div>
        <div class="row">
          <div class="grid grid-cols-2">
            <div class="-label flex justify-between items-center">
              <span class="-text"> Country(IP) &gt; Region (IP) &gt; City (IP) </span>

              <font-awesome-icon class="-cursor" icon={['fas', labelSortIcon]} onClick={this.toggleLabelSort}/>
            </div>
            <div class="-value flex justify-between items-center">
              <span class="-text"> sum (Unique Event Count) </span>

              <font-awesome-icon class="-cursor" icon={['fas', valueSortIcon]} onClick={this.toggleValueSort} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default {
  name: 'TreeTable',
  props: {
    treeData: { type: Array, default: () => [] }
  },
  setup ({ treeData }) {
    // tree 상태 및 기타 필요 데이터 추가
    const setStatus = (items, depth) => {
      return items.map(item => {
        const result = { ...item, isOpen: false, depth }

        if (item.children) result.children = setStatus(item.children, depth + 1)
        return result
      })
    }

    const rawData = ref(reactive([]))
    rawData.value = setStatus(treeData, 0)
    // console.log(rawData.value, 'ㅇ?')

    const deepSort = ({ data: items, key, status }) => {
      const sorted = sorting(items, key, status)
      for (const item of sorted) {
        item.isOpen = false
        if (item.children) item.children = deepSort({ data: item.children, key, status })
      }
      return sorted
    }

    // header 를 누르면 데이터를 sorting 하는 함수
    const sortData = ({ key, status }) => {
      const clone = JSON.parse(JSON.stringify(rawData.value)) // 복제
      rawData.value = deepSort({ data: clone, key, status })
      // console.log(rawData.value)
    }

    return () => {
      return (
        <div class="grid-wrapper">
          <div class="tree-wrapper">
            <THead onSort={ sortData }/>
            <NodeList items={rawData.value} />
          </div>
        </div>
      )
    }
  }
}
