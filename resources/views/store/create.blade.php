<x-layout>

  <x-nav.navbar />

  <div class="flex justify-center items-stretch px-12 py-12 max-sm:px-2 w-full">
    <x-card.card>
      @if ($can)
      <x-h2 hr class="text-left">Create Store</x-h2>

      <form action="{{route('store.store')}}" method="POST" enctype="multipart/form-data">
        @csrf
        <x-form-field name="name" label="Name" />
        <x-form-field name="logo" type="file" label="Store Logo" />
        <x-form-field name="description" label="Description" />
        <x-form-field name="category" label="Category" />
        <x-button class="w-full mt-4" type="submit">Create</x-button>

      </form>
      @else
      <x-h2 class="text-center">:)</x-h2>
      @endif
    </x-card.card>

  </div>

</x-layout>