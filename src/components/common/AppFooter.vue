<template>
  <footer color="#6a6a6a" f-c-c flex-col text-14>
    <p>
      Copyright © 2022 - {{ year }}
      <a
        hover="decoration-underline color-primary"
        href="https://git.haozi.net/opensource/panel"
        target="__blank"
      >
        耗子 Linux 面板
      </a>
      All Rights Reserved.
    </p>
    <p>
      <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=I1oJKSTH">交流 QQ 群 12370907</a>
      /
      <a target="_blank" href="https://pd.qq.com/s/fyol46wfy">QQ 频道 haoziofficial1</a>
      /
      <a target="_blank" href="https://github.com/TheTNB/panel/issues">问题反馈</a>
    </p>
  </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear()
</script>
