<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { getUserInfo, getUserImage, getUserContract } from '@/api/UserInfoAPI.js'

const route = useRoute()
const id = route.params.id

const form = ref({})
const imageUrl = ref('')
const contractFileList = ref([])

const sexOptions = [
  { label: '未知', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: -1 }
]

const uploadImageRef = ref(null)
const uploadContractRef = ref(null)

onMounted(async () => {
  try {
    const [userRes, imageRes, contractRes] = await Promise.all([
      getUserInfo(id),
      getUserImage(id),
      getUserContract(id)
    ])
    
    if (userRes.code === 200) {
      form.value = userRes.data
    }
    
    if (imageRes.code === 200 && imageRes.data) {
      imageUrl.value = imageRes.data.url
    }
    
    if (contractRes.code === 200 && contractRes.data) {
      contractFileList.value = [{
        name: contractRes.data.fileName || '合同文件',
        url: contractRes.data.url
      }]
    }
  } catch (err) {
    console.log(err)
  }
})

const handlePreview = (file) => {
  console.log('预览文件:', file)
  window.open(file.url, '_blank')
}

const submitForm = () => {
  uploadImageRef.value.submit()
  uploadContractRef.value.submit()
}
</script>

<template>
  <div class="form-container">
    <h2>编辑用户</h2>
    <el-form :model="form" label-width="100px" label-position="right" class="user-form">
      <el-form-item label="用户名">
        <el-input v-model="form.nick" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option v-for="opt in sexOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" placeholder="请输入地址" />
      </el-form-item>
      
      <el-form-item label="头像">
        <el-upload
          ref="uploadImageRef"
          class="avatar-uploader"
          :action="`http://localhost:8080/api/user/image/${id}`"
          :show-file-list="true"
          :auto-upload="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      
      <el-form-item label="合同文件">
        <el-upload
          ref="uploadContractRef"
          :action="`http://localhost:8080/api/user/contract/${id}`"
          :file-list="contractFileList"
          multiple
          :auto-upload="false"
          :on-preview="handlePreview"
          :limit="1"
        >
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500KB.
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<style scoped>
.form-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.user-form {
  max-width: 500px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
