import { ref, h } from 'vue'
import './TreeTable.styles.css'

const Tree = {
  props: ['node'],
  setup ({ node }) {
    const isOpen = ref(false)

    const toggleNode = () => {
      isOpen.value = !isOpen.value
    }

    return () => (
      <ul>
        <li>
          <div class="cursor-pointer" onClick={toggleNode}>
            { node.children && <span>{isOpen.value ? '[-]' : '[+]'}</span> }

            {node.label}
          </div>
            {isOpen.value && node.children && (
            <Tree data={node.children} />
            )}
        </li>
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
  props: {
    treeData: { type: Array, default: () => [] }
  },
  setup ({ treeData }) {
    console.log(treeData)

    const nodeRecursion = items => {
      const childNodes = items.map(({ label, value, children }) => {
        if (children.length > 1) return nodeRecursion(children)

        return (<div class="row">{label} : {value}</div>)
      })

      // if (items.children) return nodeRecursion(items)

      return (
        <div class="test">
          { childNodes }
        </div>
      )
    }

    return () => {
      return (
          <div class="tree-wrapper">
            { nodeRecursion(treeData) }
            {/* <Tree nodes={treeData} /> */}

            {/* <h2>Sortable Table</h2>
            <Table data={tableData} /> */}
          </div>
      )
    }
  }
}
