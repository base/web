<script lang="ts">
	import { Spring } from 'svelte/motion';

	export let text = 'Button';
	export let revealText = 'Button';

	let slideProgress = 0;

	let buttonRef: HTMLButtonElement;
	let handleRef: HTMLDivElement;

	let slideProgressSpring = new Spring(0);

	$: console.log(buttonRef);

	$: buttonWidth = buttonRef?.clientWidth;
	$: handleWidth = handleRef?.clientWidth;

	let isMouseDown = false;

	function handleMouseMove(event: MouseEvent) {
		const { clientX } = event;
		if (!isMouseDown) return;
		const { left, width } = buttonRef.getBoundingClientRect();

		console.log('handle width', handleWidth);
		const progress = (clientX - left) / (width + handleWidth);
		slideProgress = progress;
		slideProgressSpring.set(progress);
		console.log(progress);
	}

	function handleMouseDown(event: MouseEvent) {
		let currentProgress = slideProgressSpring.current;
		console.log('mouse down');
		const { clientX } = event;
		const { left, width } = buttonRef.getBoundingClientRect();
		const progress = (clientX - left) / (width + handleWidth);
		console.log('progress:', progress, 'currentProgress:', currentProgress);
		// if (currentProgress > progress) {
		// 	console.log('progress is greater than current progress');
		slideProgress = progress;
		slideProgressSpring.set(progress);
		// }
		isMouseDown = true;
	}

	let timeout: any;

	function handleMouseUp() {
		console.log('mouse up');
		if (slideProgress >= 0.3) {
			isMouseDown = false;
			slideProgress = 1;
			slideProgressSpring.set(1);

			timeout = setTimeout(() => {
				// slideProgress = 0;
				// slideProgressSpring.set(0);
			}, 2000);
		} else {
			isMouseDown = false;
			slideProgress = 0;
			slideProgressSpring.set(0);
			clearTimeout(timeout);
		}
	}

	function clamp(value: number, min: number, max: number) {
		return Math.max(min, Math.min(value, max));
	}
</script>

<button
	on:mousedown={(e) => handleMouseDown(e)}
	on:mouseup={() => handleMouseUp()}
	on:mousemove={handleMouseMove}
	on:mouseleave={() => handleMouseUp()}
	bind:this={buttonRef}
	class="group bg-black text-white h-[2.5rem] relative w-fit p-1 rounded-md flex items-center gap-2 spring-bounce-20 spring-duration-300 overflow-hidden"
>
	<div
		style="transform: translateX({clamp(
			slideProgressSpring.current * buttonWidth,
			0,
			buttonWidth + handleWidth + 2
		)}px)"
		class="z-20 absolute w-full h-full right-full bg-[#0000ff] top-0 flex items-end justify-end"
	>
		<!-- TEST -->
		<div
			style="width: {slideProgressSpring.current * buttonWidth}px;"
			class=" w-[0px] h-full flex items-center justify-center bg-black/0"
		>
			<span
				style="opacity: {slideProgressSpring.current}; filter: blur({(1 -
					slideProgressSpring.current) *
					8}px); transform: translateX({(1 - slideProgressSpring.current) * 100}px);"
				class="whitespace-nowrap flex items-center justify-center gap-2"
			>
				<span class="loader flex items-center justify-center"
					><svg
						width="14px"
						height="14px"
						stroke-width="2.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#ffffff"
						><path
							d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11"
							stroke="#ffffff"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><path
							d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
							stroke="#ffffff"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><path
							d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13"
							stroke="#ffffff"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><path
							d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21"
							stroke="#ffffff"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					></span
				>
				{revealText}
			</span>
		</div>
		<div
			style="width: {clamp(
				(1 - slideProgressSpring.current) * buttonWidth,
				0,
				buttonWidth + handleWidth
			)}px;"
			class="z-30 flex w-full h-full overflow-hidden gap-0"
		>
			<div class="w-full h-full bg-blue-500" />
			<div class="w-full h-full bg-green-500" />
			<div class="w-full h-full bg-yellow-500" />
			<div class="w-full h-full bg-orange-500" />
			<div class="w-full h-full bg-red-500" />
			<!-- <div class="w-full h-full bg-indigo-500" /> -->
			<!-- <div class="w-full h-full bg-purple-400" /> -->
		</div>
	</div>
	<div
		bind:this={handleRef}
		style="transform: translateX({clamp(
			slideProgressSpring.current * buttonWidth,
			0,
			buttonWidth + handleWidth
		)}px)"
		class="z-20 flex items-center justify-center origin-center overflow-hidden"
	>
		<div class="w-8 h-8 bg-white rounded-[2px]" />
	</div>

	<div class="px-2 z-0 bg-black">
		<div
			style="opacity: {1 - slideProgressSpring.current}; filter: blur({slideProgressSpring.current *
				8}px); transform: translateX({slideProgressSpring.current * 50}px);"
			class="text-white"
		>
			{text}
		</div>
	</div>
</button>

<style>
	.loader {
		display: inline-block;
		transform-origin: center;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
