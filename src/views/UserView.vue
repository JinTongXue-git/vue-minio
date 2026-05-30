<template>
  <div class="table-container">
    <el-table :data="userInfoInfos" stripe border
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'bold' }" style="width: 100%;">
      <el-table-column prop="id" label="ID" width="80" align="center" />

      <el-table-column prop="nick" label="用户名" min-width="120" />

      <el-table-column prop="password" label="密码" min-width="120">
        <template #default="scope">
          {{ maskPassword(scope.row.password) }}
        </template>
      </el-table-column>

      <el-table-column prop="sex" label="性别" width="80" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.sex === 1 ? 'primary' : scope.row.sex === '-1' ? 'success' : 'info'">
            {{ formatSex(scope.row.sex) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="phone" label="手机号" min-width="120" />

      <el-table-column prop="email" label="邮箱" min-width="150" />

      <el-table-column prop="address" label="地址" min-width="200" />

      <el-table-column prop="createTime" label="创建时间" min-width="180">
        <template #default="scope">
          <!-- {{ formatDate(scope.row.createTime) }} -->
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column prop="updateTime" label="更新时间" min-width="180">
        <template #default="scope">
          <!-- {{ formatDate(scope.row.updateTime) }} -->
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <router-link :to="`/edit/${scope.row.id}`">
            <el-button link type="primary" size="small">编辑</el-button>
          </router-link>
          <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserInfos } from '@/api/UserInfoAPI.js'


const userInfoInfos = ref([])

const formatSex = (sex) => {
  const sexMap = {
    0: '未知',
    1: '男',
    '-1': '女'
  }
  return sexMap[sex] || '未知'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const maskPassword = (password) => {
  if (!password) return '-'
  return password.slice(0, 3) + '****' + password.slice(-2)
}

onMounted(async () => {
  try {
    const data = await getUserInfos()
    userInfoInfos.value = data.data || []
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})
</script>

<style scoped>
.table-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>