<x-layout>
  <x-nav.navbar />

  {{-- @can('manipulate', $product) --}}
  <x-section-show>
    <x-page-header>
      <div class="flex items-center justify-between gap-8">
        <x-h2 class="dark:text-nl-150 line-clamp-1">{{$product->name}}</x-h2>
      </div>
      <x-h2 hr class="max-sm:hidden dark:text-nl-150"></x-h2>
      <x-slot:button>
        <div
          class="py-1.5 px-3.5 bg-nl-400  dark:bg-nl-200 dark:text-nl-500 dark:font-medium  rounded-lg flex justify-between gap-12 max-sm:gap-4">
          @can('manipulate', $product)
          <div class="flex gap-4">
            <x-link href="{{ url('product/'.$product->i.'/edit') }}" class="dark:font-medium ">Edit Product</x-link>
            <button form="delete">
              <x-link class="dark:font-medium ">
                Delete Product
              </x-link>
            </button>
          </div>
          @endcannot
          <a href="{{ url('product/'.$product->i) }}" class="select-all flex gap-1 items-center">{{$product->i}}
            <x-icon class="h-3.5 dark:fill-nl-350" icon="link_simple" />
          </a>
        </div>
      </x-slot:button>
      <x-h2 hr class="sm:hidden dark:text-nl-150"></x-h2>
    </x-page-header>

    <div class="w-full grid grid-cols-3 max-sm:grid-cols-1 gap-8">
      <div class="sm:col-span-2">
        <div class=" aspect-[2/1] rounded bg-nl-500 bg-center bg-cover  "
          style="background-image: url({!! App\avail::product_pic($product->i) !!})"></div>
        {{$product->description}}
        <x-h2>${{$product->price}}</x-h2>
      </div>
      @can('manipulate', $product)
      <x-card.card>
        <x-h2 hr class="text-left">Messages</x-h2>
        <x-dash-card-wrap>
          @foreach ($message as $m)
          <x-card.card-message :message="$m" />
          @endforeach
        </x-dash-card-wrap>
      </x-card.card>
      @endcan
      @cannot('manipulate', $product)
      <x-card.card>
        <x-h2 hr>Send Messages</x-h2>

        <form action="{{route('message.store')}}" method="post">
          @csrf
          <x-form-field name="p" type="hidden" label="" value="{{$product->i}}" />
          <x-form-field name="name" label="Name" />
          <x-form-field name="phone" type="tel" label="Phone" />
          <x-form-field textarea name="message" label="Message" />
          <x-button class="w-full mt-4" type="submit">Send</x-button>
        </form>


        @endcannot

        {{-- <p class="text-3xl text-center text-nl-450">
          (❁´◡`❁)</b> <br> empty inbox
        </p> --}}
      </x-card.card>
    </div>

  </x-section-show>
  <form id="delete" method="POST" action="{{url('product/'.$product->i)}}">
    @method('DELETE')
    @csrf
    <input type="hidden" name="s" value="{{$product->store->i}}">
  </form>
  {{-- @endcan --}}
</x-layout>