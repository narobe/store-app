<x-layout>

  <x-nav.navbar />

  <div class="py-8 max-sm:px-2  w-full flex items-center justify-center mt-12 md:mt-32">

    <x-card.card>
      <x-h2 hr class="text-center">Edit Store</x-h2>

      <form action="{{url('store/'.$store->i)}}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <x-form-field name="name" label="Name" value="{{old('name') ?? $store->name}}" />
        <x-form-field name="logo" type="file" label="Store Logo" />
        <x-form-field name="description" label="Description" value="{{old('description') ?? $store->description}}" />
        <x-form-field name="category" label="Category" value="{{old('category') ?? $store->category}}" />
        <x-button class="w-full mt-4" type="submit">Save</x-button>
      </form>
    </x-card.card>
  </div>

</x-layout>