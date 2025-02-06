@props(['class' => null])
<div {{$attributes}}
  class="p-8 bg-nl-50 dark:bg-nl-500 border border-nl-400 dark:border-nl-200 rounded-3xl max-sm:w-full {{$class}}">
  {{$slot}}
</div>