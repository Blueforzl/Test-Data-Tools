<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import {
  generateName,
  generatePhone,
  generateEmail,
  generateIDCard,
  generateBankCard,
  generateNickname,
  generateAddress,
} from "../utils/generator";

const props = defineProps({
  enterAction: {
    type: Object,
    required: true,
  },
});

const dataList = ref([
  {
    label: "姓名",
    value: "",
    generator: generateName,
    key: "name",
    code: "gen-name",
  },
  {
    label: "手机号",
    value: "",
    generator: generatePhone,
    key: "phone",
    code: "gen-phone",
  },
  {
    label: "邮箱",
    value: "",
    generator: generateEmail,
    key: "email",
    code: "gen-email",
  },
  {
    label: "昵称",
    value: "",
    generator: generateNickname,
    key: "nickname",
    code: "gen-nickname",
  },
  {
    label: "身份证",
    value: "",
    generator: generateIDCard,
    key: "idcard",
    code: "gen-idcard",
  },
  {
    label: "银行卡",
    value: "",
    generator: generateBankCard,
    key: "bankcard",
    code: "gen-bankcard",
  },
  {
    label: "地址",
    value: "",
    generator: generateAddress,
    key: "address",
    code: "gen-address",
  },
]);

const refreshData = (item) => {
  item.value = item.generator();
};

const refreshAll = () => {
  dataList.value.forEach((item) => {
    item.value = item.generator();
  });
};

const copyData = (text, silent = false) => {
  window.utools.copyText(text);
  if (!silent) {
    window.utools.showNotification("已复制到剪贴板");
  }
};

const handleEnterAction = (action) => {
  refreshAll();
  const matchedItem = dataList.value.find((item) => item.code === action.code);
  if (matchedItem) {
    // 如果是通过特定指令进入的，自动生成并复制
    const newValue = matchedItem.generator();
    matchedItem.value = newValue;
    copyData(newValue, true);
    window.utools.showNotification(`随机${matchedItem.label}已生成并复制`);
  }
};

watch(
  () => props.enterAction,
  (newAction) => {
    if (newAction && newAction.code) {
      handleEnterAction(newAction);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // 初始刷新已在 watch 中处理
});
</script>

<template>
  <div class="generator-container">
    <div class="glass-header">
      <div class="header-content">
        <h2 class="title"><span class="title-icon">✨</span> 随机测试数据</h2>
        <button @click="refreshAll" class="refresh-main-btn">
          <span class="btn-icon">🔄</span> 全部刷新
        </button>
      </div>
    </div>

    <div class="data-grid">
      <div v-for="item in dataList" :key="item.key" class="data-card">
        <div class="card-header">
          <span class="label">{{ item.label }}</span>
          <div class="card-actions">
            <button @click="refreshData(item)" class="icon-btn" title="刷新">
              <span class="icon">🔄</span>
            </button>
            <button @click="copyData(item.value)" class="icon-btn" title="复制">
              <span class="icon">📋</span>
            </button>
          </div>
        </div>
        <div class="card-body" @click="copyData(item.value)">
          <div class="value-display">{{ item.value }}</div>
          <div class="copy-hint">点击快速复制</div>
        </div>
      </div>
    </div>

    <div class="footer-info">
      <p>✨@Hanshantemple</p>
    </div>
  </div>
</template>

<style scoped>
.generator-container {
  padding: 80px 24px 40px;
  min-height: 100vh;
  box-sizing: border-box;
}

.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(255, 255, 240, 0.8);
  backdrop-filter: blur(10px);
  z-index: 100;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.refresh-main-btn {
  background: var(--accent);
  color: #fff;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.data-card {
  background: var(--light);
  border-radius: var(--border-radius);
  padding: 16px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(212, 175, 55, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.data-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-actions {
  display: flex;
  gap: 4px;
}

.icon-btn {
  background: transparent;
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.icon-btn:hover {
  background: var(--ivory-dark);
  color: var(--accent);
  box-shadow: none;
  transform: none;
}

.card-body {
  background: var(--ivory-dark);
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.2s;
  min-height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-body:hover {
  background: #fdfce0;
}

.value-display {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  word-break: break-all;
  line-height: 1.4;
}

.copy-hint {
  font-size: 0.7rem;
  color: var(--accent);
  margin-top: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.card-body:hover .copy-hint {
  opacity: 0.8;
}

.footer-info {
  margin-top: 48px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  opacity: 0.7;
}

@media (prefers-color-scheme: dark) {
  .glass-header {
    background: rgba(26, 26, 26, 0.8);
  }
  .card-body:hover {
    background: #252525;
  }
  .data-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    border-color: rgba(212, 175, 55, 0.2);
  }
}
</style>
