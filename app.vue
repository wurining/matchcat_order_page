<template>
  <div class="common-layout">
    <el-container class="main">
      <!-- åºéºç®ä» -->
      <el-main style="background-color: #fff; padding: 20px 20px 0">
        <h1>{{ globalData?.name || "Matcha Catð±" }}</h1>
      </el-main>
      <!-- èååºå -->
      <el-main>
        <h2>{{ globalData?.menu_text || "èå Menu" }}</h2>
        <section>
          <template v-for="(item, index) in data" :key="index">
            <!-- å¡ç -->
            <el-row class="item">
              <el-col :span="24">
                <el-card class="box-card" shadow="hover">
                  <el-row :gutter="40">
                    <!-- éå¾ -->
                    <el-col :sm="12" :xs="24" style="position:relative">
                      <el-image style=" border-radius: 5px; width: 100%; height: 100%; max-height: 20em;"
                        :src="`${baseURL}${item?.src}`" fit="contain"></el-image>
                      <!-- "fill" | "none" | "contain" | "cover" | "scale-down" -->
                    </el-col>
                    <!-- è¯¦æ -->
                    <el-col :sm="12" :xs="24">
                      <el-container style="height: 100%;">
                        <el-main>
                          <!-- ä¸­è±åå -->
                          <h3>{{ item?.title }} {{ item?.title_en }}</h3>
                          <!-- äº§åæè¿° -->
                          <p>{{ item?.description }}</p>
                        </el-main>
                        <el-footer style="--el-footer-height: auto">
                          <!-- åç±»æ°é -->
                          <el-alert :title="`æå¤å¯é${item.max}ä»½`" type="warning" show-icon style="margin: 10px 0"
                            :closable=false />
                          <el-row>
                            <el-col :span="5">
                              <!-- å ä¸ä»½ -->
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
                              <span>Ã {{ num[index] }}</span>
                            </el-col>
                          </el-row>
                          <!-- éå¶æ°é -->
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
        <h2>{{ globalData?.order_text || "å¡«åè®¢åä¿¡æ¯ Fill In Info" }}</h2>
        <section class="sumbit">
          <el-form ref="formRef" :model="validateForm" label-width="100px" class="demo-ruleForm">
            <!-- ä¸åæç¤º -->
            <el-alert title="è¯·ç¡®è®¤æ¨çè®¢åï¼ç¹å»ä¸æ¹æé®æäº¤è®¢åã" type="info" show-icon style="margin-bottom: 20px;" :closable=false />
            <el-alert title="LS1,LS2å°åºÂ£15èµ·éï¼LS3å°åºÂ£20èµ·é" type="warning" show-icon style="margin-bottom: 20px;"
              :closable=false />
            <!-- å¡«åç¨æ· -->
            <el-form-item prop="user" label-width="auto" :rules="[{ required: true, message: 'ç§°å¼æ¯å¿å¡«é¡¹' }]">
              <el-input v-model.string="validateForm.user" type="text" placeholder="è¯·è¾å¥æ¨çå§å" :clearable=true
                maxlength="256" />
            </el-form-item>
            <!-- å¡«åçµè¯ -->
            <el-form-item prop="phone" label-width="auto" :rules="[{ required: true, message: 'çµè¯æ¯å¿å¡«é¡¹' }]">
              <el-input v-model.string="validateForm.phone" placeholder="è¯·è¾å¥çµè¯" :clearable=true maxlength="14" />
            </el-form-item>
            <!-- å¡«åPostcode -->
            <el-form-item prop="postcode" label-width="auto" :rules="[{ required: true, message: 'Postcodeæ¯å¿å¡«é¡¹' }]">
              <el-input v-model="validateForm.postcode" placeholder="è¯·è¾å¥æ¨çPostcode" :clearable=true maxlength="7" />
            </el-form-item>
            <!-- å¡«åå·ä½å°å -->
            <el-form-item prop="address" label-width="auto" :rules="[{ required: true, message: 'å°åæ¯å¿å¡«é¡¹' }]">
              <el-input v-model="validateForm.address" placeholder="è¯·è¾å¥æ¨çå°å" :clearable=true maxlength="300" />
            </el-form-item>
            <!-- å¡«åè®¢åæ¶é´ -->
            <el-form-item prop="orderDate" label-width="auto" :rules="[{ required: true, message: 'è®¢åæ¶é´æ¯å¿å¡«é¡¹', type: 'date' },
            { message: 'è®¢åæ¶é´ä¸è½æ©äºä»å¤©', type: 'date', validator: validateDate }]">
              <el-date-picker v-model="validateForm.orderDate" type="date" placeholder="è¯·éæ©è®¢åæ¶é´" />
            </el-form-item>
            <!-- æäº¤è®¢å -->
            <el-form-item label-width="auto" v-show="showMsg">
              <el-alert :title="globalData?.alert_copy_text || 'è®¢åå·²çæï¼è¯·æ¨ç¹å»âå¤å¶âæé®ï¼å¹¶åéç»æ¹è¶åµ~'" type="success" show-icon
                :closable=false />
              <p id="generate" style="line-break: anywhere; user-select:auto;">{{ msg }} </p>
              <el-button type="success" style="width: 100%;" class="copy" data-clipboard-target="#generate"
                @click="afterCopy">å¤å¶</el-button>
            </el-form-item>
            <el-form-item label-width="auto">
              <el-button type="primary" size="large" style="width: 100%;" @click="submitForm(formRef)">æäº¤è®¢å
                Submit</el-button>
            </el-form-item>
          </el-form>
        </section>
      </el-main>
      <!-- èç³»æä»¬ -->
      <el-footer style="--el-footer-height:auto">
        <h2>{{ globalData?.contact_us_text || "èç³»æä»¬ Contact Us" }}</h2>
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
 * æ·»å ååå°è´­ç©è½¦
 * @param index ååç´¢å¼
 */
const addToBasket = (index: any) => {
  num.value[index]++
}

/**
 * ä»è´­ç©è½¦ä¸­ç§»é¤åå
 * @param index ååç´¢å¼
 */
const removeFromBasket = (index: any) => {
  num.value[index]--
}

const validateForm = reactive({ user: '', phone: '', postcode: '', orderDate: '', address: '' })

/**
 * æ ¡éªè®¢åæ¶é´æ¯å¦å¨å½åæ¶é´ä¹å
 * @param rule
 * @param value
 * @param callback
 * @returns {any}
 */
const validateDate = (rule: any, value: Date, callback: any) => {
  const today = new Date()
  const isAfterToday = new Date(value).getTime() >= new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  if (!isAfterToday) {
    callback(new Error('è¯·éæ©æ­£ç¡®çè®¢åæ¶é´'))
    return
  }
  callback()
}


const formRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) {
      ElMessage({ message: 'è¯·æ£æ¥è®¢åä¿¡æ¯', duration: 1000, type: 'error', grouping: true, })
      return false
    }
    const result = encodeMsg(data)
    console.log(result)
    ElMessage({ message: 'è®¢åå·²åå»ºæå', duration: 1000, type: 'success', grouping: true, })
  })
}

const msg = ref('')
const showMsg = ref(false)

const encodeMsg = (data: any) => {
  const dataBody = {
    user: validateForm.user,
    phone: validateForm.phone,
    postcode: validateForm.postcode,
    address: validateForm.address,
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

const afterCopy = () => { ElMessage({ message: 'å¤å¶æå', duration: 1000, type: 'success', grouping: true, }) }

let baseURL = ref('')
if (typeof window !== "undefined") {
  // browser code
  // window.location.origin baseURL
  baseURL = ref(`${window.location.origin}${useRuntimeConfig().app.baseURL}`)
}


onMounted(() => {
  // æ£æµæ°æ®æ¯å¦è·åæå
  if ('/' != globalData.value?._path) {
    ElMessage({ message: 'globalDataè·åå¤±è´¥', duration: 1000, type: 'error', grouping: true, })
  }
  data.value?.forEach((item: any) => {
    if ('items' != item._dir) {
      ElMessage({ message: 'itemsè·åå¤±è´¥', duration: 1000, type: 'error', grouping: true, })
    }
  })
  // åå§åå¤å¶åè½
  new ClipboardJS('.copy')
})

</script>