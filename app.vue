<template>
  <div class="common-layout">
    <el-container class="main">
      <!-- 店铺简介 -->
      <el-main style="background-color: #fff; padding: 20px 20px 0">
        <h1>{{ globalData?.name || "Matcha Cat🐱" }}</h1>
      </el-main>
      <!-- 菜单区域 -->
      <el-main>
        <h2>{{ globalData?.menu_text || "菜单 Menu" }}</h2>
        <section>
          <template v-for="(item, index) in data" :key="index">
            <!-- 卡片 -->
            <el-row class="item">
              <el-col :span="24">
                <el-card class="box-card" shadow="hover">
                  <el-row :gutter="40">
                    <!-- 配图 -->
                    <el-col :sm="12" :xs="24">
                      <el-image style=" border-radius: 5px; height: 100%;" :src="`${baseURL}${item?.src}`"
                        fit="cover"></el-image>
                    </el-col>
                    <!-- 详情 -->
                    <el-col :sm="12" :xs="24">
                      <el-container style="height: 100%;">
                        <el-main>
                          <!-- 中英品名 -->
                          <h3>{{ item?.title }} {{ item?.title_en }}</h3>
                          <!-- 产品描述 -->
                          <p>{{ item?.description }}</p>
                        </el-main>
                        <el-footer style="--el-footer-height: auto">
                          <!-- 品类数量 -->
                          <el-alert :title="`最多可选${item.max}份`" type="warning" show-icon style="margin: 10px 0"
                            :closable=false />
                          <el-row>
                            <el-col :span="5">
                              <!-- 加一份 -->
                              <el-button type="primary" style="width: 80%" @click="() => addToBasket(index)">
                                <el-icon><el-icon-plus /></el-icon>
                              </el-button>
                            </el-col>
                            <el-col :span="5">
                              <el-button type="primary" style="width: 80%" @click="() => removeFromBasket(index)">
                                <el-icon><el-icon-minus /></el-icon>
                              </el-button>
                            </el-col>
                            <el-col :span="14"
                              style="text-align: center; font-size: 1.5em; vertical-align: baseline; font-weight: bold;">
                              <span>× {{ num[index] }}</span>
                            </el-col>
                          </el-row>
                          <!-- 限制数量 -->
                          <el-input-number v-show="false" v-model="num[index]" :min="0" :max="item.max" />
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
        <h2>{{ globalData?.order_text || "填写订单信息 Fill In Info" }}</h2>
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
            <el-form-item prop="phone" label-width="auto" :rules="[{ required: true, message: '电话是必填项' }]">
              <el-input v-model.string="validateForm.phone" placeholder="请输入电话" :clearable=true maxlength="14" />
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
              <el-alert :title="globalData?.alert_copy_text || '订单已生成，请您点击“复制”按钮，并发送给抹茶喵~'" type="success" show-icon
                :closable=false />
              <p id="generate"
                style="line-break: anywhere; color: transparent; margin: 0; line-height: 20px; user-select: none;">{{
                  msg
                }}
              </p>
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
      <el-footer style="--el-footer-height:auto">
        <h2>{{ globalData?.contact_us_text || "联系我们 Contact Us" }}</h2>
        <p>{{ globalData?.contact_detials_text || "" }}</p>
      </el-footer>
    </el-container>
  </div>

</template>

<style>
.common-layout {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  position: relative;
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


const global = await useAsyncData(() => queryContent('/').findOne())
const { data } = await useAsyncData(() => queryContent('/items').find())
const globalData = ref(global['data'])
const num = ref(Array(data.value?.length).fill(0))


/**
 * 添加商品到购物车
 * @param index 商品索引
 */
const addToBasket = (index: any) => {
  num.value[index]++
}

/**
 * 从购物车中移除商品
 * @param index 商品索引
 */
const removeFromBasket = (index: any) => {
  num.value[index]--
}

const validateForm = reactive({ user: '', phone: '', postcode: '', orderDate: '', })

/**
 * 校验订单时间是否在当前时间之后
 * @param rule
 * @param value
 * @param callback
 * @returns {any}
 */
const validateDate = (rule: any, value: Date, callback: any) => {
  const today = new Date()
  const isAfterToday = new Date(value).getTime() >= new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  if (!isAfterToday) {
    callback(new Error('请选择正确的订单时间'))
    return
  }
  callback()
}


const formRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) {
      ElMessage({ message: '请检查订单信息', duration: 1000, type: 'error', grouping: true, })
      return false
    }
    const result = encodeMsg(data)
    console.log(result)
    ElMessage({ message: '订单已创建成功', duration: 1000, type: 'success', grouping: true, })
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

const afterCopy = () => { ElMessage({ message: '复制成功', duration: 1000, type: 'success', grouping: true, }) }

let baseURL = ref('')
if (typeof window !== "undefined") {
  // browser code
  // window.location.origin baseURL
  baseURL = ref(`${window.location.origin}${useRuntimeConfig().app.baseURL}`)
}


onMounted(() => {
  // 初始化复制功能
  new ClipboardJS('.copy')

  // 检测数据是否获取成功
  if ('/' != globalData.value?._path) {
    ElMessage({ message: 'globalData获取失败', duration: 1000, type: 'error', grouping: true, })
  }
  data.value?.forEach((item: any) => {
    if ('items' != item._dir) {
      ElMessage({ message: 'items获取失败', duration: 1000, type: 'error', grouping: true, })
    }
  })



  console.log(baseURL)

})

</script>