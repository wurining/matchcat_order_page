<template>
  <div class="common-layout">
    <el-container class="main">
      <!-- 店铺简介 -->
      <el-main style="background-color: #fff; padding: 20px 20px 0">
        <h1>Matcha Cat🐱 - The best Matcha, Xuemeiniang and Hezi!</h1>
      </el-main>
      <!-- 菜单区域 -->
      <el-main>
        <h2>菜单 Menu</h2>
        <section>
          <template v-for="(item, index) in data" :key="index">
            <!-- 卡片 -->
            <el-row class="item">
              <el-col :span="24">
                <el-card class="box-card" shadow="hover">
                  <el-row :gutter="40">
                    <!-- 配图 -->
                    <el-col :sm="12" :xs="24">
                      <el-image style=" border-radius: 5px; height: 100%;" :src="item?.src" fit="cover"></el-image>
                    </el-col>
                    <!-- 详情 -->
                    <el-col :sm="12" :xs="24">
                      <el-container style="height: 100%;">
                        <el-main>
                          <!-- 中英品名 -->
                          <h3>{{ item?.title }} {{ item?.title_en }}</h3>
                          <!-- 产品描述 -->
                          <p>{{ item?.description }}</p>
                          <!-- 配料选择 -->
                          <el-checkbox-group v-model="checkList[index]" @change="handleCheckChange">
                            <el-checkbox v-for="option in item?.options" :key="option.name" :label="option.name">+£{{
                              option.price
                            }} {{ option.name }}</el-checkbox>
                          </el-checkbox-group>
                        </el-main>
                        <el-footer style="--el-footer-height: auto">
                          <!-- 加一份 -->
                          <el-button type="primary" @click="" style="width: 100%">
                            <el-icon style="vertical-align: middle">
                              <el-icon-plus />
                            </el-icon>
                          </el-button>
                        </el-footer>
                        <el-footer style="--el-footer-height: auto" v-show="false">
                          <!-- 品类数量 -->
                          <el-alert :title="`最多可选${item.max}份`" type="info" show-icon style="margin: 10px 0"
                            :closable=false />
                          <el-input-number style="width: 100%;" v-model="num[index]" :min="0" :max="item.max"
                            @change="handleChange" />
                          <!-- 灰色小字提示 -->
                        </el-footer>
                      </el-container>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </template>
        </section>
      </el-main>
      <el-main>
        <h2>订单信息 Order Info</h2>
        <section class="sumbit">
          <el-form ref="formRef" :model="validateForm" label-width="100px" class="demo-ruleForm">
            <!-- 下单提示 -->
            <el-alert title="请确认您的订单，点击下方按钮提交订单。" type="info" show-icon style="margin-bottom: 20px;" :closable=false />
            <el-alert title="LS1,LS2地区£15起送，LS3地区£20起送" type="warning" show-icon style="margin-bottom: 20px;"
              :closable=false />
            <!-- 填写用户 -->
            <el-form-item prop="user" label-width="auto" :rules="[{ required: true, message: '称呼是必填项' }]">
              <el-input v-model.string="validateForm.user" type="text" placeholder="请输入您的姓名" :clearable=true
                maxlength="256" />
            </el-form-item>
            <!-- 填写电话 -->
            <el-form-item prop="phone" label-width="auto">
              <el-input v-model.string="validateForm.phone" placeholder="请输入电话（选填）" :clearable=true maxlength="14" />
            </el-form-item>
            <!-- 填写Postcode -->
            <el-form-item prop="postcode" label-width="auto" :rules="[{ required: true, message: 'Postcode是必填项' }]">
              <el-input v-model="validateForm.postcode" placeholder="请输入您的Postcode" :clearable=true maxlength="7" />
            </el-form-item>
            <!-- 填写订单时间 -->
            <el-form-item prop="orderDate" label-width="auto" :rules="[{ required: true, message: '订单时间是必填项', type: 'date' },
            { message: '订单时间不能早于今天', type: 'date', validator: validateDate }]">
              <el-date-picker v-model="validateForm.orderDate" type="date" placeholder="请选择订单时间" />
            </el-form-item>
            <!-- 提交订单 -->
            <el-form-item label-width="auto" v-show="showMsg">
              <el-alert title="订单已生成，请您点击“复制”按钮，并发送给抹茶喵~" type="success" show-icon :closable=false />
              <p id="generate" style="line-break: anywhere">{{ msg }}</p>
              <el-button type="success" style="width: 100%;" class="copy" data-clipboard-target="#generate"
                @click="afterCopy">复制</el-button>
            </el-form-item>
            <el-form-item label-width="auto">
              <el-button type="primary" size="large" style="width: 100%;" @click="submitForm(formRef)">提交订单
                Submit</el-button>
            </el-form-item>
          </el-form>
        </section>
      </el-main>
      <!-- 联系我们 -->
      <el-footer>
        <h2>联系我们 Contact us</h2>
        <p>Leeds, LS6 1BS</p>
      </el-footer>
    </el-container>
    <!-- <div class="blur-bg"></div> -->
  </div>

</template>

<style>
.common-layout {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  position: relative;
}

.blur-bg {
  background: url('/img/matcha.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(10px);
  /* make background dim */
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.main {
  background-color: #fff;
}

.item {
  margin-bottom: 20px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import ClipboardJS from 'clipboard'


const { data } = await useAsyncData('home', () => queryContent('/items').find())
const num = ref(Array(data.value?.length).fill(0))
const checkList = ref(data?.value?.map((item: any) => []))


const handleCheckChange = (val: any) => {
  console.log(val)
}

const handleChange = (cur: number | undefined, prev: number | undefined) => {
  console.log(cur)
}

const validateForm = reactive({
  user: '',
  phone: '',
  postcode: '',
  orderDate: '',
})


const validateDate = (rule: any, value: Date, callback: any) => {
  const t = new Date()
  if (new Date(value).getTime() < new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime()) {
    callback(new Error('请选择正确的订单时间'))
  } else {
    callback()
  }
}

const formRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  console.log(encodeMsg(data))
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      ElMessage({
        message: '提交成功',
        duration: 1000,
        type: 'success',
        grouping: true,
      })
    } else {
      console.log('error submit!')
      ElMessage({
        message: '提交失败',
        duration: 1000,
        type: 'error',
        grouping: true,
      })
      return false
    }
  })
}

const msg = ref('')
const showMsg = ref(false)

const encodeMsg = (data: any) => {
  const dataBody = {
    user: validateForm.user,
    phone: validateForm.phone,
    postcode: validateForm.postcode,
    orderDate: validateForm.orderDate,
    orderDetails: data?.value?.map((item: any, index: number) => {
      return {
        name: item.title,
        price: item.price,
        quantity: num.value[index],
        total: item.price * num.value[index],
        options: checkList.value[index]
      }
    }),
    total: 0
  }

  dataBody.total = dataBody.orderDetails.reduce((prev: any, cur: any) => {
    return prev + cur.total
  }, 0)

  msg.value = JSON.stringify(dataBody)
  showMsg.value = true
  return dataBody
}

const afterCopy = () => {
  ElMessage({
    message: '复制成功',
    duration: 1000,
    type: 'success',
    grouping: true,
  })
}

// 生命周期钩子
onMounted(() => {
  new ClipboardJS('.copy');
})

</script>