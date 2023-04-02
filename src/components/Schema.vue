<template>
    <Form :form="form">
        <SchemaField :schema="schema"
            :scope="{options1, eventEnums, getArgsOpts, loadArgsData }" />
        <Submit @submit="onSubmit">提交</Submit>
    </Form>
</template>

<script>
import { createForm, onFieldInputValueChange  } from "@formily/core";
import { createSchemaField } from "@formily/vue";
import { Form, FormItem, Input, Select, ArrayItems, Space, FormGrid, Submit } from "@formily/element";
import { action } from '@formily/reactive'

const schema = {
    type: "object",
    properties: {
        field_select: {
            type: "string",
            title: "输入框",
            enum: "{{options1}}",
            "x-decorator": "FormItem",
            "x-component": "Select",
            'x-decorator-props': {
                labelWidth: 100
            },
        },
        field_event: {
            type: 'array',
            'x-component': 'ArrayItems',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
                labelWidth: 100
            },
            title: '完成条件',
            default: [{}], // 默认展开一项
            items: {
                type: 'object',
                required: false,
                properties: {
                    Grid: {
                        type: 'void',
                        'x-component': 'FormGrid',
                        'x-component-props': {
                            minColumns: [24],
                            maxColumns: [24],
                            maxWidth: 200,
                        },
                        properties: {
                            EventCond: {
                                type: 'number',
                                title: '事件',
                                'x-decorator': 'FormItem',
                                'x-component': 'Select',
                                'x-decorator-props': {
                                    labelWidth: 100,
                                    gridSpan: 12,
                                },
                                'x-component-props': {
                                    filterable: true,
                                },
                                enum: '{{eventEnums}}',
                            },
                            Para: {
                                type: 'array',
                                'x-component': 'ArrayItems',
                                'x-decorator': 'FormItem',
                                'x-decorator-props': {
                                    gridSpan: 10,
                                },
                                title: '参数',
                                items: {
                                    type: 'void',
                                    'x-component': 'Space',
                                    properties: {
                                        unique: true,
                                        input: {
                                            type: 'number',
                                            'x-decorator': 'FormItem',
                                            'x-component': 'Select',
                                            'x-decorator-props': {
                                                labelWidth: 100,
                                                gridSpan: 1,
                                            },
                                            'x-reactions': ['{{getArgsOpts(loadArgsData)}}'],
                                            'x-component-props': {
                                                'allow-create': true,
                                                filterable: true,
                                            },
                                        },
                                        remove: {
                                            type: 'void',
                                            'x-decorator': 'FormItem',
                                            'x-component': 'ArrayItems.Remove',
                                            'x-decorator-props': {
                                                labelWidth: 100,
                                                gridSpan: 2,
                                            },
                                        },
                                    },
                                },
                                properties: {
                                    add: {
                                        type: 'void',
                                        title: '添加参数',
                                        'x-component': 'ArrayItems.Addition',
                                    },
                                },
                            },
                            remove: {
                                type: 'void',
                                'x-decorator': 'FormItem',
                                'x-component': 'ArrayItems.Remove',
                                'x-decorator-props': {
                                    gridSpan: 1,
                                },
                            },
                        },
                    },
                },
            },
            properties: {
                add: {
                    type: 'void',
                    title: '添加完成条件',
                    'x-component': 'ArrayItems.Addition',
                },
            },
        },
    },
};

const { SchemaField } = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        ArrayItems,
        Space,
        FormGrid
    },
});

export default {
    components: { Form, SchemaField, Submit },
    data() {
        return {
            form:null,
            schema,
            options1: [
                {
                    label: "选项1",
                    value: 1
                },
                {
                    label: "选项2",
                    value: 2
                }
            ],
            eventEnums: [
                {
                    label: "吃饭",
                    value: 1
                },
                {
                    label: "睡觉",
                    value: 2
                }
            ],
            argsMap: new Map([
                [1, {
                    args: [
                        {
                            name: "在哪里吃",
                            options: [
                                {
                                    label: "饭店1",
                                    value: 1
                                },
                                {
                                    label: "自己做2",
                                    value: 2
                                }
                            ]
                        },
                        {
                            name: "吃什么",
                            options: [
                                {
                                    label: "米饭1",
                                    value: 1
                                },
                                {
                                    label: "面条2",
                                    value: 2
                                }
                            ]
                        }
                    ]
                }],
                [2, {
                    args: [
                        {
                            name: "几点睡",
                            options: [
                                {
                                    label: "11点",
                                    value: 11
                                },
                                {
                                    label: "12点",
                                    value: 12
                                }
                            ]
                        }
                    ]
                }]
            ])
        };
    },
    created(){
      this.dynamicCreateForm()
    },
    methods: {
        onSubmit(value) {
            console.log(value);
        },
        getArgsOpts(service) {
            return function (field) {
                field.loading = true
                service(field).then(
                    action.bound((data) => {
                        field.dataSource = data
                        field.loading = false
                    })
                )
            }
        },
        // 根据event字段的值设置arg的值
        async loadArgsData(field) {
          console.log(field)
            if (typeof field.value === 'string' && field.value !== '') {
                field.setValue(parseInt(field.value))
            }
            if (field.value === null) {
                field.setValue('')
            }
            let EventCond = `${field.address.segments[0]}.${field.address.segments[1]}.Grid.EventCond`
            const value = this.form.getFieldState(EventCond)?.value
            const curIndex = field.index
            if (this.argsMap.get(value) == undefined) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([])
                    })
                }, 1500)
            }
            const opt = this.argsMap.get(value).args[curIndex]
            if (opt) {
                field.title = opt.name
            } else {
                field.title = "未命名"
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(opt ? opt.options : [])
                })
            }, 1500)
        },
        dynamicCreateForm() {
            this.form = createForm(
                {
                    effects(form) {
                    onFieldInputValueChange('field_event.*.Grid.EventCond', (field) => {
                        const paraPath = `field_event.${field.address.segments[1]}.Grid.Para`
                        form.setFieldState(paraPath, (state) => {
                            if (field.value) {
                                state.setValue([1])
                            } else {
                                state.setValue([])
                            }
                        })
                    })
                    },
                }
            )
        },
    },
};
</script>