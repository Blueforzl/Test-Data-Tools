<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  enterAction: {
    type: Object,
    required: true,
  },
});

const filePath = ref("");
const fileContent = ref("");
const error = ref("");
const isLoading = ref(false);
const fileName = ref("");

const extractFileName = (path) => {
  if (!path) return "";
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1];
};

const handleOpenDialog = () => {
  // 通过 uTools 的 api 打开文件选择窗口
  isLoading.value = true;
  error.value = "";

  const files = window.utools.showOpenDialog({
    title: "选择文件",
    properties: ["openFile"],
  });

  if (!files || files.length === 0) {
    isLoading.value = false;
    return;
  }

  const _filePath = files[0];
  filePath.value = _filePath;
  fileName.value = extractFileName(_filePath);

  try {
    const content = window.services.readFile(_filePath);
    fileContent.value = content;
  } catch (err) {
    error.value = err.message;
    fileContent.value = "";
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.enterAction,
  (enterAction) => {
    if (enterAction.type === "files") {
      isLoading.value = true;
      error.value = "";
      // 匹配文件进入,直接读取文件
      const _filePath = enterAction.payload[0].path;

      filePath.value = _filePath;
      fileName.value = extractFileName(_filePath);

      try {
        const content = window.services.readFile(_filePath);
        fileContent.value = content;
      } catch (err) {
        error.value = err.message;
        fileContent.value = "";
      } finally {
        isLoading.value = false;
      }
    }
  },
  {
    immediate: true,
  }
);

const copyContent = () => {
  if (fileContent.value) {
    window.utools.copyText(fileContent.value);
    window.utools.showNotification("✓ 文件内容已复制");
  }
};
</script>

<template>
  <div class="read-container">
    <!-- 简化背景装饰 - 仅保留1个光球 -->
    <div class="bg-decoration">
      <div class="floating-orb orb-1"></div>
    </div>

    <div class="read-content">
      <!-- 头部控制区 -->
      <div class="read-header">
        <div class="file-selector">
          <button
            @click="handleOpenDialog"
            class="select-btn"
            :disabled="isLoading"
          >
            <span class="btn-icon">📂</span>
            <span class="btn-text">{{
              isLoading ? "加载中..." : "选择文件"
            }}</span>
          </button>
        </div>

        <!-- 文件信息展示 -->
        <div v-if="fileName" class="file-info">
          <div class="file-icon">📄</div>
          <div class="file-details">
            <div class="file-name">{{ fileName }}</div>
            <div class="file-path">{{ filePath }}</div>
          </div>
          <button
            @click="copyContent"
            class="copy-btn"
            v-if="fileContent"
            title="复制全部内容"
          >
            <span class="copy-icon">📋</span>
          </button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>正在读取文件...</p>
      </div>

      <!-- 文件内容展示 -->
      <template v-if="!!fileContent">
        <div class="file-content-wrapper">
          <div class="content-header">
            <span class="header-label">文件内容</span>
            <span class="line-count"
              >{{ fileContent.split("\n").length }} 行</span
            >
          </div>
          <pre class="file-content">{{ fileContent }}</pre>
        </div>
      </template>

      <!-- 错误提示 -->
      <template v-if="!!error">
        <div class="error-state">
          <div class="error-icon">⚠️</div>
          <div class="error-message">{{ error }}</div>
        </div>
      </template>

      <!-- 空状态 -->
      <div v-if="!fileContent && !isLoading && !error" class="empty-state">
        <div class="empty-icon">📭</div>
        <p class="empty-text">选择文件以查看内容</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-container {
  min-height: 100vh;
  padding: 80px 24px 40px;
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
  will-change: transform;
  transform: translateZ(0);
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.2;
  animation: float 10s ease-in-out infinite;
  will-change: transform;
  transform: translateZ(0);
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: var(--gradient-primary);
  top: -80px;
  right: -80px;
  animation-delay: 0s;
}

.read-content {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.read-header {
  animation: slideDown 0.4s ease-out; /* 缩短动画时间 */
}

.file-selector {
  margin-bottom: 24px;
}

.select-btn {
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 24px;
  padding: 12px 28px;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
}

.select-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.select-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.2rem;
}

.file-info {
  background: var(--glass-bg);
  /* 简化毛玻璃效果 */
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow);
  animation: fadeIn 0.4s ease-out; /* 缩短动画时间 */
  margin-bottom: 24px;
  will-change: transform;
  transform: translateZ(0);
}

.file-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  word-break: break-all;
}

.file-path {
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.7;
  word-break: break-all;
}

.copy-btn {
  background: var(--glass-bg-light);
  /* 移除毛玻璃,提升性能 */
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
  flex-shrink: 0;
  will-change: transform;
  transform: translateZ(0);
}

.copy-btn:hover {
  background: var(--glass-bg);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.copy-btn:active {
  transform: scale(0.95);
}

.copy-icon {
  font-size: 1.2rem;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  animation: fadeIn 0.4s ease-out;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--glass-border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

.loading-state p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0;
}

/* 文件内容展示 */
.file-content-wrapper {
  background: var(--glass-bg);
  /* 简化毛玻璃效果 */
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  animation: slideUp 0.4s ease-out; /* 缩短动画时间 */
  will-change: transform;
  transform: translateZ(0);
}

.content-header {
  background: var(--glass-bg-light);
  /* 移除毛玻璃,提升性能 */
  padding: 14px 20px;
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.line-count {
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: var(--glass-bg-light);
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
}

.file-content {
  background: transparent;
  width: 100%;
  overflow: auto;
  padding: 24px;
  box-sizing: border-box;
  margin: 0;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 600px;
}

/* 错误状态 */
.error-state {
  background: rgba(245, 101, 101, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(245, 101, 101, 0.3);
  border-radius: var(--border-radius);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  animation: fadeIn 0.4s ease-out;
}

.error-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.error-message {
  color: #f56565;
  font-size: 0.95rem;
  line-height: 1.5;
  flex: 1;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  animation: fadeIn 0.4s ease-out; /* 缩短动画时间 */
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
  opacity: 0.7;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .error-state {
    background: rgba(245, 101, 101, 0.15);
    border-color: rgba(245, 101, 101, 0.4);
  }

  .file-content {
    color: var(--text-primary);
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .read-container {
    padding: 80px 16px 32px;
  }

  .file-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .copy-btn {
    align-self: flex-end;
  }

  .file-content {
    max-height: 400px;
    font-size: 0.85rem;
  }
}
</style>
