<template>
	<div style="display: flex; flex-direction: column">
		<span>CSS样式案例</span>

		<div>
			<div
				v-for="(item, index) in staticPage"
				:key="index"
				@click="jumpToStaticStyle(item.path)"
			>
				<button>{{ item.name }}</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import router from '@/router'

// 路由列表
const staticPage = [
	{
		path: '../staticStyle/flashyText',
		name: '闪光文字',
	},
	{
		path: '../staticStyle/noCollisionLineLoading',
		name: '无碰撞线加载',
	},
	{
		path: '../staticStyle/stereoCarousel',
		name: '立体轮播图',
	},
	{
		path: '../staticStyle/raindropBackground',
		name: '雨滴背景',
	},
]

// 路由跳转
function jumpToStaticStyle(path) {
	router.push(path)
}
</script>

<style></style>
