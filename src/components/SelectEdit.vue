<template>
    <Form :form="form">
        <SchemaField :schema="schema" />
        <Submit @submit="onSubmit">提交</Submit>
    </Form>
</template>

<script>
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/vue";
import { Form, FormItem, Input, Submit } from "@formily/element";
import EditRender from "./SelectEdit/EditRender.vue";
import EditTemplate from "./SelectEdit/index";

const schema = {
    type: "object",
    properties: {
        input: {
            type: "string",
            title: "输入框",
            enum: [
                {
                    label: "选项1",
                    value: 1
                },
                {
                    label: "选项2",
                    value: 2
                }
            ],
            "x-decorator": "FormItem",
            "x-component": "EditRender",
        },
    },
};

const form = createForm();
const { SchemaField } = createSchemaField({
    components: {
        FormItem,
        Input,
        EditRender,
        EditTemplate
    },
});

export default {
    components: { Form, SchemaField, Submit },
    data() {
        return {
            form,
            schema,
        };
    },
    methods: {
        onSubmit(value) {
            console.log(value);
        },
    },
};
</script>