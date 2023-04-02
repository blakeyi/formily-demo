
<script>
import { ref, watch, defineComponent, h } from '@vue/composition-api'
import { useField } from '@formily/vue'
import { connect, mapProps } from '@formily/vue'

const SelectEdit = defineComponent({
    name: 'SelectEdit',
    props: {
        value: {
            default: '',
            type: [String, Number],
        },
        options: {
            type: [Array, Object],
            default: () => [],
        },
    },
    setup(props, { attrs, emit}) {
        const newValue = ref(props.value)
        const fieldRef = useField()
        watch(
            () => props.value,
            (newVal) => {
                console.log(newVal)
                newValue.value = newVal
            }
        )

        const onChangeHandle = (val) => {
            newValue.value = val
        }

        const onBtnClick = (event) => {
            console.log('onBtnClick', fieldRef.value.address.entire, newValue.value)
            emit('edit', fieldRef.value.address.entire, newValue.value)
        }

        return () => [
            h(
                "div", {
                style: {
                    display: "flex"
                },
            }, [h(
                // 标签
                'el-select',
                // 相关属性参数
                {
                    attrs: {
                        ...attrs
                    },
                    style: {
                        marginRight: '10px',
                    },
                    // props相关的
                    props: {
                        value: newValue.value,
                    },
                    // 事件相关
                    on: {
                        change: onChangeHandle
                    }
                },
                props.options.length > 0 && props.options.map(option => {
                    return h(
                        'el-option',
                        {
                            props: {
                                label: option.label,
                                value: option.value
                            }
                        }
                    )
                })
            ),
            h('el-button', {
                props: {
                    type: 'plain',
                    icon: "el-icon-edit",
                    circle: true
                },
                on: {
                    click: onBtnClick,
                },
            })]
            )
        ]

    },
})

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
</script>