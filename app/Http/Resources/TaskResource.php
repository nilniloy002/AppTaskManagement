<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
//            'due_date' => $this->due_date ->format('Y-m-d'),
            'due_date' => $this->due_date instanceof \Carbon\Carbon
                ? $this->due_date->format('Y-m-d')
                : $this->due_date,
            'status' => $this->status,
        ];
    }
}
