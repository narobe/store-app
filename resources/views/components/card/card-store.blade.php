@props(['store'])

<div class="w-full bg-nl-400  dark:bg-nl-400 rounded-md">
  <div class="flex justify-between w-full px-4 bg-nl-500 dark:bg-nl-600 text-sm text-nl-200 rounded-md rounded-b-none">
    <span class="">{{$store->name}}</span>
    <a href="{{url('store/'.$store->i)}}" class="select-all flex gap-1 items-center">{{$store->i}}
      <x-icon class="h-3.5" icon="link_simple" />
    </a>
  </div>
  <div class="py-3 px-4 flex gap-x-8">
    <div class="flex flex-col items-center">
      <x-h2 class="select-all leading-none text-white">{{$store->product->count()}}</x-h2>
      <span class="text-xs text-center text-nl-400 dark:text-nl-200 leading-none block">Products</span>
    </div>
    <div class="flex flex-col items-center">
      <x-h2 class="select-all leading-none text-white">{!! App\avail::a_s_v_c($store) !!}</x-h2>
      <span class="text-xs text-center text-nl-400 dark:text-nl-200 leading-none block">Visits</span>
    </div>

  </div>
</div>