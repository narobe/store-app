@props(['class' => null])
<input {{ $attributes->merge(['type' => 'text']) }}
class=" w-full py-1 px-3 text-black bg-nl-100 dark:bg-nl-400 border
border-nl-300 dark:text-nl-100 dark:focus-visible:bg-nl-600 focus-visible:outline-nl-prime rounded-md
placeholder:font-light
placeholder:text-neutral-500 {{$class}}">