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

const isRefreshing = ref(false);

const dataList = ref([
  {
    label: "姓名",
    value: "",
    generator: generateName,
    key: "name",
    code: "gen-name",
    icon: "👤",
    refreshing: false,
    copied: false,
  },
  {
    label: "手机号",
    value: "",
    generator: generatePhone,
    key: "phone",
    code: "gen-phone",
    icon: "📱",
    refreshing: false,
    copied: false,
  },
  {
    label: "邮箱",
    value: "",
    generator: generateEmail,
    key: "email",
    code: "gen-email",
    icon: "📧",
    refreshing: false,
    copied: false,
  },
  {
    label: "昵称",
    value: "",
    generator: generateNickname,
    key: "nickname",
    code: "gen-nickname",
    icon: "😊",
    refreshing: false,
    copied: false,
  },
  {
    label: "身份证",
    value: "",
    generator: generateIDCard,
    key: "idcard",
    code: "gen-idcard",
    icon: "🪪",
    refreshing: false,
    copied: false,
  },
  {
    label: "银行卡",
    value: "",
    generator: generateBankCard,
    key: "bankcard",
    code: "gen-bankcard",
    icon: "💳",
    refreshing: false,
    copied: false,
  },
  {
    label: "地址",
    value: "",
    generator: generateAddress,
    key: "address",
    code: "gen-address",
    icon: "📍",
    refreshing: false,
    copied: false,
  },
]);

// 初始化时立即生成数据,避免等待
const initializeData = () => {
  dataList.value.forEach((item) => {
    item.value = item.generator();
  });
};

// 组件挂载时立即生成数据
initializeData();

const refreshData = (item) => {
  item.value = item.generator();
  // 触发刷新动画
  item.refreshing = true;
  setTimeout(() => {
    item.refreshing = false;
  }, 600);
};

const refreshAll = () => {
  isRefreshing.value = true;
  dataList.value.forEach((item) => {
    item.value = item.generator();
  });
  setTimeout(() => {
    isRefreshing.value = false;
  }, 600);
};

const copyData = (item, silent = false) => {
  const text = typeof item === "object" ? item.value : item;
  window.utools.copyText(text);
  if (!silent) {
    window.utools.showNotification("✓ 已复制到剪贴板");
    // 触发复制成功动画
    if (typeof item === "object") {
      item.copied = true;
      setTimeout(() => {
        item.copied = false;
      }, 800);
    }
  }
};

const handleEnterAction = (action) => {
  if (!action || !action.code) return;

  const matchedItem = dataList.value.find((item) => item.code === action.code);
  if (matchedItem) {
    // 如果是通过特定指令进入的,重新生成并复制
    const newValue = matchedItem.generator();
    matchedItem.value = newValue;
    copyData(matchedItem, true);
    window.utools.showNotification(`✓ 随机${matchedItem.label}已生成并复制`);
  }
};

watch(
  () => props.enterAction,
  (newAction, oldAction) => {
    // 只在 enterAction 真正变化时才处理,避免初始化时重复执行
    if (newAction && newAction.code && newAction !== oldAction) {
      handleEnterAction(newAction);
    }
  }
);

onMounted(() => {
  // 初始刷新已在 watch 中处理
});
</script>

<template>
  <div class="generator-container">
    <!-- 简化背景装饰 - 仅保留1个光球 -->
    <div class="bg-decoration">
      <div class="floating-orb orb-1"></div>
    </div>

    <div class="glass-header">
      <div class="header-content">
        <div class="title-section">
          <h2 class="title">
            <span class="title-icon">✨</span>
            <span class="title-text">随机测试数据</span>
          </h2>
          <p class="subtitle">快速生成各类测试数据</p>
        </div>
        <button @click="refreshAll" class="refresh-main-btn">
          <span class="btn-icon" :class="{ rotating: isRefreshing }">🔄</span>
          <span class="btn-text">全部刷新</span>
        </button>
      </div>
    </div>

    <div class="data-grid">
      <div
        v-for="(item, index) in dataList"
        :key="item.key"
        class="data-card"
        :class="{ copied: item.copied, refreshing: item.refreshing }"
        :style="{ animationDelay: `${index * 0.03}s` }"
      >
        <div class="card-header">
          <div class="label-section">
            <span class="card-icon">{{ item.icon }}</span>
            <span class="label">{{ item.label }}</span>
          </div>
          <div class="card-actions">
            <button
              @click="refreshData(item)"
              class="icon-btn"
              title="刷新"
              :class="{ spinning: item.refreshing }"
            >
              <span class="icon">🔄</span>
            </button>
            <button
              @click="copyData(item)"
              class="icon-btn"
              title="复制"
              :class="{ success: item.copied }"
            >
              <span class="icon">{{ item.copied ? "✓" : "📋" }}</span>
            </button>
          </div>
        </div>
        <div class="card-body" @click="copyData(item)">
          <div class="value-display">{{ item.value || "点击生成..." }}</div>
          <div class="copy-hint">
            {{ item.copied ? "✓ 已复制" : "点击复制" }}
          </div>
        </div>
      </div>
    </div>

    <div class="footer-info">
      <p>✦ 精心打造 · 提升效率 ✦</p>
    </div>
  </div>
</template>

<style scoped>
.generator-container {
  padding: 80px 24px 40px;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 - 性能优化 */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  /* 启用硬件加速 */
  will-change: transform;
  transform: translateZ(0);
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px); /* 减少模糊半径 */
  opacity: 0.2; /* 降低不透明度 */
  animation: float 10s ease-in-out infinite; /* 减慢动画速度 */
  will-change: transform; /* 硬件加速 */
  transform: translateZ(0);
}

.orb-1 {
  width: 200px; /* 减小尺寸 */
  height: 200px;
  background: var(--gradient-primary);
  top: -80px;
  left: -80px;
  animation-delay: 0s;
}

.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--glass-bg);
  /* 减少模糊强度,提升性能 */
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  z-index: 100;
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  animation: slideDown 0.4s ease-out; /* 缩短动画时间 */
  /* 硬件加速 */
  will-change: transform;
  transform: translateZ(0);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 10px;
}

.subtitle {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.refresh-main-btn {
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 24px;
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.refresh-main-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
}

.btn-icon {
  display: inline-block;
  transition: transform 0.3s;
}

.btn-icon.rotating {
  animation: spin 0.6s ease;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.data-card {
  background: var(--gradient-card);
  /* 简化毛玻璃效果,提升性能 */
  backdrop-filter: blur(8px) saturate(150%);
  -webkit-backdrop-filter: blur(8px) saturate(150%);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeIn 0.3s ease-out backwards; /* 缩短动画时间 */
  position: relative;
  overflow: hidden;
  /* 硬件加速 */
  will-change: transform;
  transform: translateZ(0);
}

.data-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.data-card:hover::before {
  transform: scaleX(1);
}

.data-card:hover {
  transform: translateY(-6px) translateZ(0); /* 减少位移,启用硬件加速 */
  box-shadow: var(--shadow-lg);
  border-color: rgba(102, 126, 234, 0.3);
}

.data-card.copied {
  animation: glow-pulse 0.8s ease;
}

.data-card.refreshing .card-icon {
  animation: spin 0.6s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-icon {
  font-size: 1.6rem;
  display: inline-block;
  transition: transform 0.3s;
}

.data-card:hover .card-icon {
  transform: scale(1.1);
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.3px;
}

.card-actions {
  display: flex;
  gap: 6px;
}

.icon-btn {
  background: var(--glass-bg-light);
  /* 移除毛玻璃,使用纯色背景提升性能 */
  color: var(--text-secondary);
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s,
    box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  /* 硬件加速 */
  will-change: transform;
  transform: translateZ(0);
}

.icon-btn:hover {
  background: var(--glass-bg);
  color: var(--accent);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.icon-btn:active {
  transform: scale(0.95);
}

.icon-btn.spinning .icon {
  animation: spin 0.6s ease;
}

.icon-btn.success {
  background: rgba(72, 187, 120, 0.2);
  color: #48bb78;
  border-color: rgba(72, 187, 120, 0.3);
}

.icon {
  font-size: 1rem;
  display: inline-block;
  transition: all 0.3s;
}

.card-body {
  background: var(--glass-bg-light);
  /* 移除毛玻璃,提升性能 */
  padding: 16px;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--glass-border);
  /* 硬件加速 */
  will-change: transform;
  transform: translateZ(0);
}

.card-body:hover {
  background: var(--glass-bg);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.card-body:active {
  transform: scale(0.98) translateZ(0);
}

.value-display {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-primary);
  word-break: break-all;
  line-height: 1.5;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  transition: opacity 0.2s;
}

.copy-hint {
  font-size: 0.75rem;
  color: var(--accent);
  margin-top: 6px;
  opacity: 0.6;
  transition: all 0.3s;
  font-weight: 500;
}

.card-body:hover .copy-hint {
  opacity: 1;
  transform: translateY(-2px);
}

.footer-info {
  margin-top: 64px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  opacity: 0.7;
  font-weight: 500;
  letter-spacing: 1px;
  animation: fadeIn 1s ease-out 0.5s backwards;
}

@media (prefers-color-scheme: dark) {
  .glass-header {
    background: var(--glass-bg);
    border-bottom-color: var(--glass-border);
  }

  .card-body:hover {
    background: var(--glass-bg);
  }

  .data-card:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    border-color: rgba(102, 126, 234, 0.3);
  }

  .icon-btn:hover {
    background: rgba(45, 55, 72, 0.6);
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .data-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .refresh-main-btn {
    width: 100%;
    justify-content: center;
  }

  .floating-orb {
    opacity: 0.1; /* 移动端进一步降低不透明度 */
    animation-duration: 12s; /* 减慢动画 */
  }
}

@media (max-width: 480px) {
  .generator-container {
    padding: 100px 16px 32px;
  }

  .title {
    font-size: 1.2rem;
  }

  .data-card {
    padding: 16px;
  }
}
</style>
