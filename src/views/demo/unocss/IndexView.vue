<template>
  <CommonPage :show-footer="true">
    <p>
      文档：<a c-blue hover-decoration-underline href="https://uno.antfu.me/" target="_blank"
    >https://uno.antfu.me/</a
    >
    </p>
    <p>
      playground：
      <a c-blue hover-decoration-underline href="https://unocss.antfu.me/play/" target="_blank">
        https://unocss.antfu.me/play/
      </a>
    </p>

    <div f-c-c flex-col mt-20 w-350>
      <div b-1 bc-ccc flex flex-wrap justify-around p-10 rounded-10>
        <div b-1 f-c-c h-50 m-20 p-10 rounded-5 w-50>
          <span bg-black dark:bg-white h-6 rounded-3 w-6/>
        </div>
        <div b-1 flex h-50 justify-between m-20 p-10 rounded-5 w-50>
          <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          <span bg-black dark:bg-white h-6 rounded-3 self-end w-6/>
        </div>
        <div b-1 flex h-50 justify-between m-20 p-10 rounded-5 w-50>
          <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          <span bg-black dark:bg-white h-6 rounded-3 self-center w-6/>
          <span bg-black dark:bg-white h-6 rounded-3 self-end w-6/>
        </div>
        <div b-1 flex h-50 justify-between m-20 p-10 rounded-5 w-50>
          <div flex-col justify-between>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          </div>
          <div flex-col justify-between>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          </div>
        </div>
        <div b-1 flex-col h-50 items-center justify-between m-20 p-10 rounded-5 w-50>
          <div flex justify-between w-full>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          </div>
          <div bg-black dark:bg-white h-6 rounded-3 w-6/>
          <div flex justify-between w-full>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          </div>
        </div>
        <div b-1 flex-col h-50 justify-between m-20 p-10 rounded-5 w-50>
          <div flex justify-between w-full>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          </div>
          <div flex justify-between w-full>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          </div>
          <div flex justify-between w-full>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
            <span bg-black dark:bg-white h-6 rounded-3 w-6/>
          </div>
        </div>
      </div>
      <h2 color-gray font-normal mt-10 text-14>Flex 骰子</h2>
    </div>
  </CommonPage>
</template>
