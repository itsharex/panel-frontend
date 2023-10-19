<template>
  <footer color="#6a6a6a" f-c-c flex-col text-14>
    <p>
      Copyright © 2022 - {{ year }}
      <a
          hover="decoration-underline color-primary"
          href="https://github.com/haozi-team/panel"
          target="__blank"
      >
        耗子 Linux 面板
      </a>
      All Rights Reserved.
    </p>
    <p>
      严禁使用耗子 Linux 面板从事任何非法活动，非法站点请勿向我们请求任何形式的技术支持。
    </p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
