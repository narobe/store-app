@props(['href'=> null,'class' => null,'hrefclass' => null, 'icon' => null, 'iclass' => null])

@if ($href)
<a href="{{$href}}" class="{{$hrefclass}}">
  @endif
  <button {{$attributes}}
    class="{{$icon ? 'flex items-center' : ''}}  gap-3 py-1.5 px-3.5 bg-nl-400  dark:bg-nl-200 dark:text-nl-500 dark:font-medium  rounded-lg {{$class}}">

    <x-icon icon="{{$icon ?? ''}}" class="{{$iclass}}" />
    {{$slot}}

  </button>
  @if ($href)
</a>
@endif