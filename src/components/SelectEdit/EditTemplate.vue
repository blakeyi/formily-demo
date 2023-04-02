<template>
    <div style="display: flex;">
        <el-select v-bind="$attrs"
            v-model="newValue"
            :options="options"
            style="margin-right: 10px;"
            @change="onChangeHandle">
            <el-option v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
            </el-option></el-select>
        <el-button type="plain"
            icon="el-icon-edit"
            circle
            @click="onBtnClick">
        </el-button>
    </div>
</template>

<script>
import { ref, watch, defineComponent } from '@vue/composition-api'
import { useField } from '@formily/vue'
export default defineComponent({
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
    setup(props, { attrs, emit }) {
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
            console.log()
            newValue.value = val
        }

        const onBtnClick = (event) => {
            console.log('onBtnClick', fieldRef.value.address.entire, newValue.value)
            emit('edit', fieldRef.value.address.entire, newValue.value)
        }

        return {
            newValue,
            onChangeHandle,
            onBtnClick,
        }
    },
})
</script>