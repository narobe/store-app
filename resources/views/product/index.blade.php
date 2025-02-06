<x-layout>

  <x-nav.navbar />
  <x-section-show>
    <div class="grow">
      <div class="flex items-center justify-between gap-8">
        <x-h2 class="dark:text-nl-150">Products</x-h2>
        @if (!Auth::check())
        <div class="flex gap-4 flex-wrap">
          <x-button id="search_bar_toggle" icon="find" iclass="dark:fill-nl-450">Search</x-button>
          <x-button id="filter_toggle" icon="filter" iclass="dark:fill-nl-450">Filter</x-button>
        </div>
        @endif
      </div>
    </div>
    <x-h2 hr></x-h2>
    @if (!Auth::check())
    <x-search />
    <x-filter />
    @endif
    <x-grid-show>
      @foreach ($product as $p)
      <x-card.card-store-product-show :product="$p" />
      @endforeach
    </x-grid-show>
  </x-section-show>
</x-layout>