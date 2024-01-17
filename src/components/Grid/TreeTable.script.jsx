import { ref } from 'vue'
import './TreeTable.styles.css'

const Node = {
  name: 'Node',
  props: ['label', 'value', 'children', 'depth'],
  setup (props) {
    const isOpen = ref(false)

    const toggle = () => { isOpen.value = !isOpen.value }

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
            { this.isOpen }
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
  setup () {

  },
  render () {
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
              Country(IP) &gt; Region (IP) &gt; City (IP)

              <font-awesome-icon class="-cursor" icon={['fas', 'arrow-up-wide-short']} />
            </div>
            <div class="-value flex justify-between items-center">
              sum (Unique Event Count)

              <font-awesome-icon class="-cursor" icon={['fas', 'arrow-up-wide-short']} />
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

    const rawData = setStatus(treeData, 0)
    // console.log(rawData, 'ㅇ?')

    return () => {
      return (
        <div class="grid-wrapper">

          <div class="tree-wrapper">
          <THead />
            <NodeList items={rawData} />
          </div>
        </div>
      )
    }
  }
}

// export default {
//   name: 'TreeTable',
//   props: {
//     treeData: { type: Array, default: () => [] }
//   },
//   setup ({ treeData }) {
//     console.log(treeData)

//     const nodeRecursion = items => {
//       const childNodes = items.map(({ label, value, children, isOpen }) => {
//         // console.log(items)
//         const hasChildren = children.length > 1

//         return (
//           <li class="row">
//             <div class="grid grid-cols-2">
//               <div class="flex items-center gap-2 -label">
//                   {isOpen}
//                   { hasChildren ? (<font-awesome-icon class="-toggle-icon" icon={['fas', 'circle-plus']} onClick={() => (isOpen = !isOpen)} />) : null }
//                 <span>{label}</span>
//               </div>

//               <div class="-value">{value}</div>
//             </div>

//             { (hasChildren && isOpen.value) ? nodeRecursion(children) : null }
//           </li>)
//       })

//       return (
//         <ul class="-depth">
//           { childNodes }
//         </ul>
//       )
//     }

//     const setStatus = items => {
//       return items.map(item => {
//         const result = { ...item, isOpen: false }
//         if (item.children) result.children = setStatus(item.children)
//         return result
//       })
//     }

//     const rawData = setStatus(treeData)

//     console.log(rawData, 'ㅇ?')

//     return () => {
//       return (
//         <div class="grid-wrapper">
//           <h2>ㅎㅎ</h2>

//           <div class="tree-wrapper">
//             { nodeRecursion(rawData) }

//             {/* <h2>Sortable Table</h2>
//             <Table data={tableData} /> */}
//           </div>
//         </div>
//       )
//     }
//   }
// }
