@props(['class' => null,'invert' => false, 'hr'])

<h2 {{$attributes}}
    class="text-3xl leading-normal font-medium {{ $invert ? 'text-nl-400 dark:text-nl-100' :  'dark:text-nl-400 text-nl-100'}} {{$class}}">
    {{$slot}}
    @isset($hr)
    <div class="w-full h-0 mb-6 border-b border-b-nl-300 "></div>
    @endisset
</h2>