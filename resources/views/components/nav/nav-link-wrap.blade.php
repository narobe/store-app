@props(['class' => null])
<div {{$attributes}} id="link_group"
  class="grow gap-x-20 gap-y-4 flex flex-wrap items-center lg:justify-end max-sm:hidden max-sm:grid-cols-2 max-sm:p-6 max-sm:gap-4 max-sm:gap-y-8 {{$class}}">
  {{$slot}}
</div>