<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="bg-gray-100">
	<Navbar/>
    <slot></slot> 
</div>
