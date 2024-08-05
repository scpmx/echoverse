<script lang="ts">
  let themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="#/" class="btn btn-ghost text-xl">solochan</a>
  </div>
  <div class="flex-none">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          class="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
          ></path>
        </svg>
      </div>
      <ul
        tabindex="-1"
        class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        {#each themes as theme}
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
            />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
