@props(['product'])
<x-card.card class="py-0 px-0 border-opacity-0 dark:border-2 dark:border-nl-300">
  <div class="px-4 pt-2 border border-nl-400 dark:border-none  rounded-t-3xl">
    <div class="mb-4 flex justify-between">
      <span
        class="cursor-pointer text-nl-100 text-xs font-medium px-2 rounded-full bg-green-700">{{$product->category}}</span>
      @can('manipulate', $product)
      <span class="text-nl-500 dark:text-nl-100 text-xs font-medium">{{$product->created_at->format('M:d')}}</span>
      @endcan
      @cannot('manipulate', $product)
      {{-- <span class="text-nl-500 dark:text-nl-100 text-xs font-medium">{{$product->created_at}}</span> --}}
      @endcannot
    </div>
    <div class="flex justify-between gap-3">
      <x-h3 invert hr class="grow line-clamp-2">{{$product->name}}</x-h3>
      <x-h3 invert hr class="">${{$product->price}}</x-h3>
    </div>
    <div class="w-full aspect-[2/1] rounded-lg bg-nl-350 bg-center bg-cover"
      style="background-image: url({!! App\avail::product_pic($product->i) !!})"></div>
    <x-button href="{{url('product/'.$product->i)}}" class="w-full my-6" hrefclass="w-full">View Product</x-button>


  </div>
  <div
    class="flex justify-between w-full px-6 pb-0.5  bg-nl-400  dark:bg-nl-600  text-sm text-nl-200 rounded-3xl rounded-t-none">
    @can('manipulate', $product)
    <span><b>{{$product->message->count()}}</b> messages</span>
    @endcan
    @cannot('manipulate', $product)
    <span><b>{{App\avail::a_p_v_c($product)}}</b> view</span>
    @endcannot
    <a href="{{ url('product/'.$product->i) }}" class="select-all flex gap-1 items-center">{{$product->i}}
      <x-icon class="h-3.5" icon="link_simple" />
    </a>
  </div>
</x-card.card>