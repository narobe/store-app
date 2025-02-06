<x-layout>

  <x-nav.navbar />
  @can('manipulate', $product)
  <div class="py-8 max-sm:px-2 w-full flex items-center justify-center mt-12 md:mt-32">

    <x-card.card>
      <x-h2 hr class="text-center">Edit Product</x-h2>

      <form action="{{url('product/'.$product->i)}}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <x-form-field name="name" label="Product Name" value="{{old('name') ?? $product->name}}" />
        <x-form-field name="picture" type="file" label="Product Picture" />
        <x-form-field name="price" label="Price" value="{{old('price') ?? $product->price}}" />
        <x-button class="w-full mt-4" type="submit">Save</x-button>
      </form>
    </x-card.card>
  </div>
  @endcan
</x-layout>