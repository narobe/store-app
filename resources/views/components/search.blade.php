<x-card.card id="search_bar" class="hidden mb-8 py-4 w-full">
  <form method="POST" action="{{route('product.filter')}}">
    @csrf
    <input id="min_max_filter_input" type="hidden" name="order" value="max">
    <div class="flex items-center gap-12 max-sm:flex max-sm:flex-col max-sm:items-stretch">
      <div class="flex items-center gap-4">
        <x-form-label>Keyword</x-form-label>
        <x-form-input name="k" />
      </div>
      <div class="flex items-center gap-4">
        <x-form-label>Price</x-form-label>
        <div class="w-full flex items-stretch min-h-8  border border-nl-300 rounded-md overflow-clip">
          <span id="min_max_filter_toggle"
            class="min-h-8 px-2 dark:text-black bg-nl-400 dark:bg-nl-100 border border-nl-300 border-r-0 text-nl-100 border-none rounded-none">max</span>

          <x-form-input name="p"
            class="border-none outline-none rounded-l-none dark:focus-visible:outline-none focus-visible:outline-transparent" />
        </div>
      </div>
      <div class="">
        <x-button class="max-sm:w-full" type="submit">GO</x-button>
      </div>
    </div>
  </form>
</x-card.card>