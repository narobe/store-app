@props(['textarea','name','label','error', 'type', 'value' => null])
<div class="w-full my-2">
    <x-form-label for="{{$name}}">{{$label}}</x-form-label>
    @isset($textarea)
    <x-form-textarea name="{{$name}}" type="{{$type ?? ''}}" value="{{$value}}" />
    @else
    <x-form-input name="{{$name}}" type="{{$type ?? ''}}" value="{{$value}}" />
    @endisset
    <x-form-error name="{{$error ?? $name}}" />
</div>