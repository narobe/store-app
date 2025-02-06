<x-layout>

  <x-nav.navbar />

  <div class="flex justify-center items-stretch px-12 py-12 max-sm:px-2 w-full">
    <x-card.card>
      <x-h2 hr class="text-left">Create Product</x-h2>
      <form action="{{route('product.store')}}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="s" value="{{$store}}">
        <x-form-field name="name" label="Product Name" />
        <x-form-field name="picture" type="file" label="Picture" />
        <x-form-field name="price" label="Price" />
        <x-button class="w-full mt-4" type="submit">Create</x-button>
      </form>
    </x-card.card>

  </div>

</x-layout>