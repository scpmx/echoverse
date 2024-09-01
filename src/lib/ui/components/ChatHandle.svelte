<script lang="ts">

    type Props = {
        handle: string
    }

    let { handle }: Props = $props();

    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
        'bg-orange-500',
        'bg-cyan-500'
    ];

    function hashCode(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    // Use the hash of the handle to select a color
    const colorIndex = hashCode(handle) % colors.length;
    const handleColor = colors[colorIndex];
</script>

<span class="mr-2 px-2 py-1 text-xs font-semibold text-white rounded-full font-mono {handleColor}">
    {handle}
</span>
