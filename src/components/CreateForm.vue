<template>
    <Form :form="form">
        <SchemaField :schema="schema" />
        <Submit @submit="onSubmit">提交</Submit>
    </Form>
</template>

<script>
import {
    createForm, onFieldValueChange, onFieldInit, onFieldReact, onFieldChange
    , onFieldInitialValueChange, onFieldInputValueChange
} from "@formily/core";
import { createSchemaField } from "@formily/vue";
import { Form, FormItem, Input, InputNumber, Submit } from "@formily/element";

const schema = {
    type: "object",
    properties: {
        field_string: {
            type: "string",
            title: "输入框(string)",
            "x-decorator": "FormItem",
            "x-decorator-props": {
                labelWidth: 200,
                labelAlign: "right",
            },
            "x-component": "Input",
        },
        field_number: {
            type: "number",
            title: "输入框(number)",
            "x-decorator": "FormItem",
            "x-decorator-props": {
                labelWidth: 200,
                labelAlign: "right",
            },
            "x-component": "InputNumber",
        }
    },
};

const { SchemaField } = createSchemaField({
    components: {
        FormItem,
        Input,
        InputNumber
    },
});

export default {
    components: { Form, SchemaField, Submit },
    data() {
        return {
            form: null,
            schema,
        };
    },
    created() {
        this.dynamicCreateForm()
    },
    methods: {
        onSubmit(value) {
            console.log(value);
        },
        dynamicCreateForm() {
            this.form = createForm(
                {
                    values: {
                        field_string: "1234",
                        field_number: 1234,
                    },
                    initialValues: {
                        field_string: "123",
                        field_number: 123
                    },
                    effects(form) {
                        // field相关hook,在field初始化时调用
                        // 执行顺序1
                        onFieldInit('field_string', (field) => {
                            console.log("onFieldInit: ", field)
                        })
                        // 执行顺序2
                        onFieldReact('field_string', (field) => {
                            console.log("onFieldReact: ", field)
                        })
                        // 执行顺序3
                        onFieldChange('field_string', (field) => {
                            console.log("onFieldChange: ", field)
                        })

                        // 用户输入(手动setValue或者setValues)改变时hook
                        // 执行顺序1
                        onFieldInputValueChange('field_string', (field) => {
                            console.log("onFieldInputValueChange: ", field)

                            // 当field_string字段的值为999时,将field_number的值也改成999
                            form.setFieldState('field_number', (state) => {
                                if (field.value == "999") {
                                    state.setValue(999)
                                } 
                            })
                        })

                        // 执行顺序2
                        onFieldValueChange('field_string', (field) => {
                            console.log("onFieldValueChange: ", field)
                        })

                        // 手动执行setInitValue时触发
                        onFieldInitialValueChange('field_string', (field) => {
                            console.log("onFieldInitialValueChange: ", field)
                        })
                    },
                }
            )
        },
    },

};
</script>

<style lang="scss" scoped>
::v-deep .el-input-number {
    .el-input__inner {
        text-align: left;
    }
}
</style>