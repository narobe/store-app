<x-layout>

  <x-nav.navbar />

  <x-section-show>
    <div class="flex items-center justify-between gap-8">
      <div class="grow">
        <x-h2 class="dark:text-nl-150">Stores</x-h2>
        <x-h2 hr></x-h2>
      </div>
      @if (Auth::check())
      <x-button href="{{route('store.create')}}">Add Store</x-button>
      @endif
    </div>
    <x-grid-show>
      @foreach ($store as $s)
      <x-card.card-store-show :store="$s" />
      @endforeach
    </x-grid-show>
  </x-section-show>
</x-layout>