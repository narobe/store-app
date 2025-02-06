@props(['class' => null])
<div class="flex items-center justify-center gap-2 {{$class}}">
  <div class="">
    <x-icon icon="sun" class="fill-nl-50 dark:fill-nl-250" />
  </div>
  <div id="theme_toggle"
    class="h-4 w-8 rounded-full border border-nl-300 dark:bg-nl-50 dark:bg-opacity-30 flex items-stretch justify-start dark:justify-end">
    <div class="h-full w-4 rounded-full bg-nl-150"></div>
  </div>
  <div class="">
    <x-icon icon="moon" class="fill-nl-250 dark:fill-nl-50" />
  </div>
</div>