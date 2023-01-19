<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>Matcha Cat🐱 - The best Matcha, Xuemeiniang and Hezi!</h1>
      </el-header>
      <el-main>
        <h2>Order</h2>
        <section class="main">
          <template v-for="i in 10">
            <el-row class="item">
              <el-col :span="24">
                <el-card class="box-card">
                  <el-row :gutter="40">
                    <el-col :sm="12" :xs="24">
                      <el-image style="border-radius: 5px;" src="/matcha.jpg" fit="cover"></el-image>
                    </el-col>
                    <el-col :sm="12" :xs="24">
                      <h3>芋泥盒子 Yunihezi</h3>
                      <p>
                        Yunihezi is a traditional Chinese dessert. It is made of glutinous rice flour, taro, and sugar.
                        It
                        is a kind of dessert that is very popular in China. It is very delicious and sweet. It is very
                        popular with children.
                      </p>
                      <el-input-number v-model="num" :min="0" :max="10" @change="handleChange" />
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </template>
        </section>
      </el-main>
      <el-footer>
        <h2>联系我们 Contact us</h2>
        <p>Leeds, LS6 1BS</p>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
.common-layout {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
}

.item {
  margin-bottom: 20px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = (cur: number | undefined, prev: number | undefined) => {
  console.log(cur, prev)
}
</script>