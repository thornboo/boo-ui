<template>
	<div class="container">
		<div class="navigation-bar">
			<div class="navigation-title">boo-ui</div>
			<div class="navigation-right-link">
				<div><input placeholder="搜索文档" /></div>
				<div>
					<a href="https://github.com/">GitHub <span></span></a>
				</div>
				<div></div>
			</div>
		</div>
		<div class="content">
			<div class="sidebar">
				<div>
					<span>基础</span>
					<ul style="list-style: none">
						<li>按钮</li>
						<li>图标</li>
						<li>排版</li>
						<li>布局</li>
					</ul>
				</div>
			</div>
			<div class="body"></div>
		</div>
	</div>
</template>

<script setup>
import menu from '@/menu'

console.log(menu)
</script>

<style lang="scss" scoped>
.container {
	.navigation-bar {
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid #eaecef;
		display: flex;
		height: 50px;
		justify-content: space-between;
		width: 100%;

		.navigation-title {
			align-items: center;
			display: flex;
			padding-left: 20px;
			width: 20%;
		}

		.navigation-right-link {
			align-items: center;
			display: flex;
			gap: 10px;
			justify-content: flex-end;
			width: 70%;
		}
	}

	.content {
		display: flex;

		.sidebar {
			width: 20%;
		}

		.body {
			width: 100%;
		}
	}
}
</style>
