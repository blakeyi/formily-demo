import SelectEdit from './EditTemplate.vue'

import { connect, mapProps } from '@formily/vue'
const FormItem = connect(
  SelectEdit,
  mapProps(
    { dataSource: 'options', loading: true },
    (props) => {
      return {
        ...props,
      }
    },
    
  )
)

export default FormItem