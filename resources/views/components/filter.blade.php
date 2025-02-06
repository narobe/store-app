<x-card.card id="filter_bar" class="hidden mb-8 py-4 w-full">
  <div class="flex flex-wrap gap-x-2 sm:gap-x-8 sm:gap-y-4 gap-y-1">
    @foreach (App\avail::all_cats() as $i=>$cat)
    <button form="{{'filter'.$i}}"
      class="cursor-pointer text-nl-100 text-xs font-medium px-2 rounded-full bg-green-700">{{$cat}}</button>
    <form id="{{'filter'.$i}}" action="{{route('product.filter')}}" method="POST" class="hidden">
      @csrf
      <input type="hidden" name="f" value="{{$cat}}">
    </form>
    @endforeach
  </div>
</x-card.card>