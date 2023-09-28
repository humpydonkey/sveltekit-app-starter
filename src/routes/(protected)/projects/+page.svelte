<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { PenLine } from 'lucide-svelte';
	let inputPrompt = '';
	let imageData: string | null;

	const generateImage = async (prompt: string) => {
		imageData = await fetch('/api/image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ inputPrompt })
		})
		.then((res) => res.json())
		.then((jsonData) => jsonData["data"]);
	};
</script>

<div class="flex flex-row justify-center items-center mb-4">
	<h2>Demo</h2>
</div>

<hr class="!border-t-2 mt-2 mb-6" />

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><PenLine /></div>
	<input class="input"
		type="text"
		name="prompt"
		bind:value={inputPrompt}
		placeholder="Type your prompt..."
		autocomplete="off"
		required
	/>
	<button class="variant-filled-secondary" on:click={() => generateImage(inputPrompt)}>Submit</button>
</div>

{#if imageData}
	<div class="card p-4">
		<img src={imageData} alt=""/>
	</div>
{/if}
