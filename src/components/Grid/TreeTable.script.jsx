import { ref } from 'vue'
import './TreeTable.styles.css'

const Node = {
  name: 'Node',
  props: ['label', 'value', 'children'],
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
    const { label, value, children } = this.props

    const hasChildren = (children && children.length) > 0
    const icon = hasChildren ? (<font-awesome-icon class="-toggle-icon" icon={['fas', this.isOpen ? 'circle-minus' : 'circle-plus']} onClick={this.toggle} />) : null

    return (
      <li class="row">
        <div class="grid grid-cols-2">
          <div class="flex items-center gap-2 -label">
            { this.isOpen }
            { icon }
            <span>{ label }</span>
          </div>
          <div class="-value">{value}</div>
        </div>
        {hasChildren && this.isOpen ? <NodeList items={children} /> : null}
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
    return (
      <ul class="-depth">
        { this.props.items.map((item, index) => <Node key={index} {...item} />) }
      </ul>
    )
  }
}

// const Table = {
//   props: ['data'],
//   setup (props) {
//     const sortColumn = ref(null)

//     const toggleSort = (column) => {
//       sortColumn.value = column
//     }

//     return () => (
//       <table>
//         <thead>
//           <tr>
//             {Object.keys(props.data[0]).map((column) => (
//               <th onClick={() => toggleSort(column)}>
//                 {column}
//                 {sortColumn.value === column && ' 🔽'}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {props.data.map((row) => (
//             <tr>
//               {Object.values(row).map((value) => (
//                 <td>{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )
//   }
// }

export default {
  name: 'TreeTable',
  props: {
    treeData: { type: Array, default: () => [] }
  },
  setup ({ treeData }) {
    const setStatus = items => {
      return items.map(item => {
        const result = { ...item, isOpen: false }
        if (item.children) result.children = setStatus(item.children)
        return result
      })
    }

    const rawData = setStatus(treeData)

    console.log(rawData, 'ㅇ?')

    return () => {
      return (
        <div class="grid-wrapper">
          <h2>ㅎㅎ</h2>

          <div class="tree-wrapper">
            <NodeList items={rawData}/>

            {/* <h2>Sortable Table</h2>
            <Table data={tableData} /> */}
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
