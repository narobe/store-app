<x-layout>


  <x-nav.navbar />

  <div class="flex max-sm:flex-col justify-center items-stretch px-12 py-12 max-sm:px-2 w-full">
    <x-card.card class="w-96 sm:rounded-r-none max-sm:rounded-b-none max-sm:border-b-0 max-sm: sm:border-r-0">
      <x-h2 hr class="text-left">Stores</x-h2>

      <x-dash-card-wrap>
        @foreach ($store as $s)
        <x-card.card-store :store="$s" />
        @endforeach

      </x-dash-card-wrap>

      {{-- <p class="text-3xl text-center text-nl-450">
        <b class="font-semibold">(☞ºヮº)☞</b> <br> <b class="font-semibold">Don't be lazy</b> create your
        first
        store now
      </p> --}}
      {{-- <x-button href="{{route('store.create')}}" class="w-full mt-6">Create Store</x-button> --}}

    </x-card.card>
    <x-card.card class="w-96 rounded-none">
      <x-h2 hr class="text-left">Messages</x-h2>

      <x-dash-card-wrap class=" ">
        @foreach ($message as $m)
        <x-card.card-message :message="$m" />
        @endforeach
      </x-dash-card-wrap>

      {{-- <p class="text-3xl text-center text-nl-450">
        (❁´◡`❁)</b> <br> empty inbox
      </p> --}}
    </x-card.card>
    <x-card.card class="w-96  sm:rounded-l-none max-sm:rounded-t-none sm:border-l-0 max-sm:border-t-0">
      <x-h2 hr class="text-left">Products</x-h2>

      <x-product-card-wrap>
        @foreach ($product as $p)
        <x-card.card-product :product="$p" />
        @endforeach
      </x-product-card-wrap>

      {{-- <p class="text-3xl text-center text-nl-450">
        <b class="font-semibold">:)</b></b> <br> no <b class="font-semibold">store</b> to put products
      </p> --}}
      {{-- <p class="text-3xl text-center text-nl-450">
        <b class="font-semibold">(☞ºヮº)☞</b></b> <br> go to <b class="font-semibold">store</b> and products
      </p> --}}
    </x-card.card>
  </div>
</x-layout>