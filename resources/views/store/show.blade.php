<x-layout>
  <x-nav.navbar />

  <x-section-show>
    <x-page-header>
      <div class="flex items-center justify-between gap-8">
        <x-h2 class="dark:text-nl-150">{{$store->name}}</x-h2>
        <div class="rounded-sm h-10 w-10 bg-nl-50 bg-center bg-cover"
          style="background-image: url({!! App\avail::store_logo($store->i) !!})"></div>
      </div>
      <x-h2 hr class="dark:text-nl-150"></x-h2>
      <x-slot:button class="">
        @can('manipulate', $store)
        <x-button href="{{route('product.create',['s'=>$store->i])}}">Add Product
        </x-button>
        @endcan
        <div
          class="py-1.5 px-3.5 bg-nl-400 dark:bg-nl-200 dark:text-nl-500 dark:font-medium  flex justify-between gap-12 max-sm:gap-4 rounded-lg">
          @can('manipulate', $store)
          <div class="flex gap-4">
            <x-link href="{{ url('store/'.$store->i.'/edit') }} " class="dark:font-medium ">Edit Store
            </x-link>
            <button form="delete">
              <x-link class="dark:font-medium ">
                Delete Store
              </x-link>
            </button>
          </div>
          @endcan
          <a href="{{ url('store/'.$store->i) }}" class="select-all flex gap-1 items-center">{{$store->i}}
            <x-icon class="h-3.5 dark:fill-nl-350" icon="link_simple" />
          </a>
        </div>
      </x-slot:button>
    </x-page-header>

    <x-grid-show>
      @foreach ($product as $p)
      <x-card.card-store-product-show :product="$p" />
      @endforeach
    </x-grid-show>

  </x-section-show>
  <form id="delete" method="POST" action="{{url('store/'.$store->i)}}">
    @method('DELETE')
    @csrf
  </form>
</x-layout>