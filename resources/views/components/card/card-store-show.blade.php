@props(['store'])

<x-card.card class="py-0 px-0 border-opacity-0 dark:border-2 dark:border-nl-300">
  <div class="px-4 pt-2 border border-nl-400 dark:border-none  rounded-t-3xl">
    <div class="mb-4 flex justify-end">
      <span class="text-nl-500 dark:text-nl-100 text-xs font-medium">{{$store->created_at->format('M:d')}}</span>
    </div>
    <div class="flex justify-between bg-center bg-cover">
      <div class="rounded-sm h-10 w-10 bg-nl-50 bg-center bg-cover"
        style="background-image: url({!! App\avail::store_logo($store->i) !!})">
      </div>
      <x-h3 invert>{{$store->name}}</x-h3>
    </div>
    <x-h3 hr class="-mb-6"></x-h3>
    <div class="flex gap-x-8">
      <div class="flex flex-col items-center">
        <x-h2 class="select-all leading-none">{{$store->product->count()}}</x-h2>
        <span class="text-xs text-center text-nl-400 dark:text-nl-200 leading-none block">Products</span>
      </div>
      <div class="flex flex-col items-center">
        <x-h2 class="select-all leading-none">{{App\avail::a_s_v_c($store)}}</x-h2>
        <span class="text-xs text-center text-nl-400 dark:text-nl-200 leading-none block">Visits</span>
      </div>

    </div>
    <div class="mb-6 mt-8 flex justify-between gap-2">
      @can('manipulate', $store)
      <x-button href="{{route('product.create')}}"
        class="w-full bg-transparent dark:bg-transparent border border-nl-350 dark:border-nl-250 text-nl-500 dark:text-white font-medium"
        hrefclass="w-full">Add Product</x-button>
      @endcan
      <x-button href="{{url('store/'.$store->i)}}" hrefclass="w-full" class="w-full">
        View Store</x-button>
    </div>
  </div>

  <div
    class="flex justify-end w-full px-6 pb-0.5  bg-nl-400  dark:bg-nl-600  text-sm text-nl-200 rounded-3xl rounded-t-none">
    <a href="{{ url('store/'.$store->i) }}" class="select-all flex gap-1 items-center">{{$store->i}}
      <x-icon class="h-3.5" icon="link_simple" />
    </a>
  </div>

</x-card.card>